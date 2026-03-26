import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import levelsData from '@root/data/levels.json';
import { ILevel } from '@game/interfaces/game.interface';

const levels: ILevel[] = levelsData as ILevel[];

function rewriteBaseUrl(level: ILevel): ILevel {
  const base = process.env.TARGET_PAGES_BASE_URL || 'http://localhost:5000';
  const LOCAL = 'http://localhost:5000';
  return {
    ...level,
    targetUrl: level.targetUrl ? level.targetUrl.replace(LOCAL, base) : level.targetUrl,
    starterCode: level.starterCode.split(LOCAL).join(base)
  };
}

export class LevelsController {
  getLevels(_req: Request, res: Response): void {
    res.status(StatusCodes.OK).json({ levels: levels.map(rewriteBaseUrl) });
  }

  getLevel(req: Request, res: Response): void {
    const { id } = req.params;
    const level = levels.find((l) => l.id === id);

    if (!level) {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Level '${id}' not found.` });
      return;
    }

    res.status(StatusCodes.OK).json({ level: rewriteBaseUrl(level) });
  }
}

export const levelsController = new LevelsController();
