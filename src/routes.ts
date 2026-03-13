import { authRoutes } from '@auth/routes/authRoutes';
import { currentUserRoutes } from '@auth/routes/currentRoutes';
import { chatRoutes } from '@chat/routes/chatRoutes';
import { commentRoutes } from '@comment/routes/commentRoutes';
import { followerRoutes } from '@follower/routes/followerRoutes';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { imageRoutes } from '@image/routes/imageRoutes';
import { notificationRoutes } from '@notification/routes/notificationRoutes';
import { postRoutes } from '@post/routes/postRoutes';
import { reactionRoutes } from '@reaction/routes/reactionRoutes';
import { flashcardRoutes } from '@flashcards/routes/flashcardRoutes';
import { serverAdapter } from '@service/queues/base.queue';
import { healthRoutes } from '@user/routes/healthRoutes';
import { userRoutes } from '@user/routes/userRoutes';
import { gameRoutes } from '@game/routes/gameRoutes';
import { progressRoutes } from '@progress/routes/progressRoutes';
import { Application } from 'express';
import express from 'express';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const setupRoutes = (): void => {
    // Serve test-quest target pages (allow iframing)
    const targetPagesPath = path.join(__dirname, '..', '..', 'target-pages');
    app.use('/pages', (_req: Request, res: Response, next: NextFunction) => {
      res.setHeader('X-Frame-Options', 'ALLOWALL');
      next();
    }, express.static(targetPagesPath));

    app.use('/queues', authMiddleware.verifyUser, serverAdapter.getRouter());
    app.use('/health', healthRoutes.health());
    app.use('/health-env', authMiddleware.verifyUser, healthRoutes.env());
    app.use('/health-instance', authMiddleware.verifyUser, healthRoutes.instance());
    app.use('/fibo', authMiddleware.verifyUser, healthRoutes.fiboRoutes());
    app.use(BASE_PATH, authRoutes.routes());

    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, postRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, reactionRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, commentRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, followerRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, notificationRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, imageRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, chatRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, flashcardRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, gameRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, progressRoutes.routes());

  };
  setupRoutes();
};
