import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProgressModel } from '@progress/models/progress.model';

class ProgressController {
  async getProgress(req: Request, res: Response): Promise<void> {
    const userId = req.currentUser!.userId;
    const progress = await ProgressModel.findOne({ userId });

    if (!progress) {
      res.status(StatusCodes.OK).json({ completedLevels: [], xp: 0 });
      return;
    }

    res.status(StatusCodes.OK).json({
      completedLevels: progress.completedLevels,
      xp: progress.xp,
    });
  }

  async saveProgress(req: Request, res: Response): Promise<void> {
    const userId = req.currentUser!.userId;
    const { completedLevels, xp } = req.body as { completedLevels: string[]; xp: number };

    if (!Array.isArray(completedLevels) || !completedLevels.every((l) => typeof l === 'string')) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'completedLevels must be an array of strings' });
      return;
    }
    if (typeof xp !== 'number' || !Number.isInteger(xp) || xp < 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'xp must be a non-negative integer' });
      return;
    }

    await ProgressModel.findOneAndUpdate(
      { userId },
      { completedLevels, xp, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(StatusCodes.OK).json({ message: 'Progress saved' });
  }
}

export const progressController = new ProgressController();
