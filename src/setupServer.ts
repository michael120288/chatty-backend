import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import HTTP_STATUS from 'http-status-codes';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import Logger from 'bunyan';
import JWT from 'jsonwebtoken';
import apiStats from 'swagger-stats';
import 'express-async-errors';
import { config } from '@root/config';
import applicationRoutes from '@root/routes';
import { setupSwagger } from '@root/swagger';
import { CustomError, IErrorResponse } from '@global/helpers/error-handler';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { SocketIOPostHandler } from '@socket/post';
import { SocketIOFollowerHandler } from '@socket/follower';
import { SocketIOUserHandler } from '@socket/user';
import { SocketIONotificationHandler } from '@socket/notification';
import { SocketIOImageHandler } from '@socket/image';
import { SocketIOChatHandler } from '@socket/chat';

const SERVER_PORT = parseInt(process.env.PORT || '5000', 10);
const log: Logger = config.createLogger('server');

export class ChattyServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    if (!config.TEST_CLEANUP_SECRET) {
      log.warn('TEST_CLEANUP_SECRET is not set — the test-cleanup endpoint and rate-limit bypass will refuse all requests (fail closed).');
    }
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.apiMonitoring(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        sameSite: config.NODE_ENV === 'development' ? 'lax' : 'none'
      })
    );
    app.use(hpp());
    app.use(helmet());
    const allowedOrigins =
      config.NODE_ENV === 'production'
        ? [config.CLIENT_URL!]
        : [config.CLIENT_URL!, 'http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000'];

    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());

    const isTestSessionUser = (req: Request): boolean => {
      // Fail closed: if TEST_CLEANUP_SECRET is not configured, this bypass can never match.
      if (config.TEST_CLEANUP_SECRET && req.headers['x-test-secret'] === config.TEST_CLEANUP_SECRET) return true;
      const token = req.session?.jwt;
      if (!token) return false;
      try {
        const payload = JWT.verify(token, config.JWT_TOKEN!) as { username?: string };
        const username = payload.username?.toLowerCase() ?? '';
        return ['vitest', 'pytest', 'pw_'].some((p) => username.startsWith(p));
      } catch {
        return false;
      }
    };

    const uploadLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 30,
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: 'Too many upload requests, please try again later.' },
      skip: isTestSessionUser
    });

    // Image upload routes must be registered BEFORE the global 1mb limit
    app.use(
      [
        '/api/v1/signup',
        '/api/v1/images/profile',
        '/api/v1/images/background',
        '/api/v1/post/image/post',
        '/api/v1/post/image/:postId',
        '/api/v1/post/video/post',
        '/api/v1/post/video/:postId',
        '/api/v1/cards/with-image',
        '/api/v1/chat/message'
      ],
      uploadLimiter,
      json({ limit: '50mb' })
    );
    app.use(json({ limit: '1mb' }));
    app.use(urlencoded({ extended: true, limit: '1mb' }));

    const httpLog = config.createLogger('http');
    app.use(
      morgan(':method :url :status :res[content-length]b :response-time ms', {
        stream: { write: (msg: string) => httpLog.info(msg.trim()) },
        skip: (req: Request) => req.url === '/health'
      })
    );
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
    setupSwagger(app);
  }

  private apiMonitoring(app: Application): void {
    app.use('/api-monitoring', authMiddleware.verifyUser);
    app.use(
      apiStats.getMiddleware({
        uriPath: '/api-monitoring'
      })
    );
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });
    //@ts-ignore
    app.use((error: IErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeError());
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        status: 'error',
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
      });
    });
  }

  private async startServer(app: Application): Promise<void> {
    if (!config.JWT_TOKEN) {
      throw new Error('JWT_TOKEN must be provided');
    }
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      this.socketIOConnections(socketIO);
    } catch (error) {
      log.error(error);
    }
  }

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    io.use((socket, next) => {
      const token = socket.handshake.auth?.token as string | undefined;
      if (!token) {
        return next(new Error('Authentication required'));
      }
      try {
        const payload = JWT.verify(token, config.JWT_TOKEN!, { algorithms: ['HS256'] }) as Record<string, unknown>;
        socket.data.user = payload;
        next();
      } catch {
        next(new Error('Invalid or expired token'));
      }
    });
    return io;
  }

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Worker with process id of ${process.pid} has started...`);
    log.info(`Server has started with process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server running on port ${SERVER_PORT}`);
    });
  }

  private socketIOConnections(io: Server): void {
    const postSocketHandler: SocketIOPostHandler = new SocketIOPostHandler(io);
    const followerSocketHandler: SocketIOFollowerHandler = new SocketIOFollowerHandler(io);
    const userSocketHandler: SocketIOUserHandler = new SocketIOUserHandler(io);
    const chatSocketHandler: SocketIOChatHandler = new SocketIOChatHandler(io);
    const notificationSocketHandler: SocketIONotificationHandler = new SocketIONotificationHandler();
    const imageSocketHandler: SocketIOImageHandler = new SocketIOImageHandler();

    postSocketHandler.listen();
    followerSocketHandler.listen();
    userSocketHandler.listen();
    chatSocketHandler.listen();
    notificationSocketHandler.listen(io);
    imageSocketHandler.listen(io);
  }
}