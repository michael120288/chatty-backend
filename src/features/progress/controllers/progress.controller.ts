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

    await ProgressModel.findOneAndUpdate(
      { userId },
      { completedLevels, xp, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(StatusCodes.OK).json({ message: 'Progress saved' });
  }
}

export const progressController = new ProgressController();
