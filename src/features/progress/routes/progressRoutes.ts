import express, { Router } from 'express';
import { progressController } from '@progress/controllers/progress.controller';
import { authMiddleware } from '@global/helpers/auth-middleware';

export class ProgressRoutes {
  routes(): Router {
    const router = express.Router();
    router.get('/progress', authMiddleware.checkAuthentication, progressController.getProgress.bind(progressController));
    router.put('/progress', authMiddleware.checkAuthentication, progressController.saveProgress.bind(progressController));
    return router;
  }
}

export const progressRoutes: ProgressRoutes = new ProgressRoutes();
