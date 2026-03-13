import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import levelsData from '@root/data/levels.json';
import { ILevel } from '@game/interfaces/game.interface';

const levels: ILevel[] = levelsData as ILevel[];

export class LevelsController {
  getLevels(_req: Request, res: Response): void {
    res.status(StatusCodes.OK).json({ levels });
  }

  getLevel(req: Request, res: Response): void {
    const { id } = req.params;
    const level = levels.find((l) => l.id === id);

    if (!level) {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Level '${id}' not found.` });
      return;
    }

    res.status(StatusCodes.OK).json({ level });
  }
}

export const levelsController = new LevelsController();
