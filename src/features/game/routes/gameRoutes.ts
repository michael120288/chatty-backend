import express, { Router } from 'express';
import { levelsController } from '@game/controllers/levels.controller';
import { submissionController } from '@game/controllers/submission.controller';

export class GameRoutes {
  routes(): Router {
    const router = express.Router();
    router.get('/game/levels', levelsController.getLevels.bind(levelsController));
    router.get('/game/levels/:id', levelsController.getLevel.bind(levelsController));
    router.post('/game/submit', submissionController.submit.bind(submissionController));
    return router;
  }
}

export const gameRoutes: GameRoutes = new GameRoutes();
