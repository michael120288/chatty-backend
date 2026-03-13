import express, { Router } from 'express';
import { progressController } from '@progress/controllers/progress.controller';

export class ProgressRoutes {
  routes(): Router {
    const router = express.Router();
    router.get('/progress', progressController.getProgress.bind(progressController));
    router.put('/progress', progressController.saveProgress.bind(progressController));
    return router;
  }
}

export const progressRoutes: ProgressRoutes = new ProgressRoutes();
