import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { levelsController } from '@game/controllers/levels.controller';
import { submissionController } from '@game/controllers/submission.controller';

const submitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please wait a minute before trying again.' },
});

export class GameRoutes {
  routes(): Router {
    const router = express.Router();
    router.get('/game/levels', levelsController.getLevels.bind(levelsController));
    router.get('/game/levels/:id', levelsController.getLevel.bind(levelsController));
    router.post('/game/submit', submitLimiter, submissionController.submit.bind(submissionController));
    return router;
  }
}

export const gameRoutes: GameRoutes = new GameRoutes();
