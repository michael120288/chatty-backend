import { authRoutes } from '@auth/routes/authRoutes';
import { testCleanupRoutes } from '@auth/routes/testCleanupRoutes';
import { schemaController } from '@auth/controllers/schema';
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
import { mockApiRoutes } from '@game/routes/mockApiRoutes';
import { progressRoutes } from '@progress/routes/progressRoutes';
import { Application } from 'express';
import express from 'express';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const setupRoutes = (): void => {
    // Serve test-quest target pages (allow iframing)
    const targetPagesPath = path.join(process.cwd(), 'target-pages');
    // Mock API routes for target pages (no auth — called from iframes)
    app.use('/api', mockApiRoutes.routes());

    app.use('/pages', (_req: Request, res: Response, next: NextFunction) => {
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
      res.setHeader('Content-Security-Policy', `frame-ancestors 'self' ${clientUrl}`);
      res.removeHeader('X-Frame-Options');
      next();
    }, express.static(targetPagesPath));

    app.use('/queues', authMiddleware.verifyUser, serverAdapter.getRouter());
    app.use('/health', healthRoutes.health());
    app.use('/health-env', authMiddleware.verifyUser, healthRoutes.env());
    app.use('/health-instance', authMiddleware.verifyUser, healthRoutes.instance());
    app.use('/fibo', authMiddleware.verifyUser, healthRoutes.fiboRoutes());
    app.use(BASE_PATH, authRoutes.routes());
    // Enabled in all environments, including production, so QA test accounts
    // (vitest/pytest/pw_ prefixes) created against codeandtest.com can be
    // cleaned up too. Guarded by TEST_CLEANUP_SECRET + username-prefix checks
    // inside testCleanupRoutes/test-cleanup.ts.
    app.use(BASE_PATH, testCleanupRoutes.routes());
    app.get(`${BASE_PATH}/schema`, schemaController.get);

    app.use(BASE_PATH, authMiddleware.identifyUser, currentUserRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, postRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, reactionRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, commentRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, followerRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, notificationRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, imageRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, chatRoutes.routes());
    // app.use(BASE_PATH, authMiddleware.verifyUser, flashcardRoutes.routes()); // disabled — flashcards WIP
    app.use(BASE_PATH, authMiddleware.identifyUser, userRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, gameRoutes.routes());
    app.use(BASE_PATH, authMiddleware.identifyUser, progressRoutes.routes());

    app.use(BASE_PATH, (req: Request, res: Response) => {
      res.status(404).json({ message: 'Route not found', statusCode: 404, status: 'error' });
    });
  };
  setupRoutes();
};
