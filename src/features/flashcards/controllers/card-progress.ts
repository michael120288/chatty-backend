import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CardProgressModel } from '@flashcards/models/card-progress.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { ICardProgressDocument } from '@flashcards/interfaces/card-progress.interface';

export class CardProgress {
  // Calculate next review date using simplified SM-2 algorithm
  private calculateNextReview(difficulty: string, currentInterval: number = 1): Date {
    const easeFactor: Record<string, number> = {
      easy: 2.5,
      good: 2.0,
      hard: 1.3,
      again: 1.0
    };

    const factor = easeFactor[difficulty] || 1.0;
    const nextInterval = currentInterval * factor;
    const daysUntilReview = Math.max(1, Math.round(nextInterval));

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + daysUntilReview);

    return nextReviewDate;
  }

  private calculateMasteryLevel(correctCount: number, incorrectCount: number, timesStudied: number): number {
    if (timesStudied === 0) return 0;

    const accuracy = correctCount / timesStudied;
    const totalReviews = timesStudied;

    if (accuracy >= 0.9 && totalReviews >= 10) return 5; // Mastered
    if (accuracy >= 0.8 && totalReviews >= 8) return 4;
    if (accuracy >= 0.7 && totalReviews >= 5) return 3;
    if (accuracy >= 0.5 && totalReviews >= 3) return 2;
    if (timesStudied >= 1) return 1;
    return 0;
  }

  private getConfidenceLevel(difficulty: string): string {
    if (difficulty === 'easy') return 'high';
    if (difficulty === 'good') return 'medium';
    return 'low';
  }

  // Update progress after studying a card
  public async updateProgress(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const { difficulty } = req.body; // 'again', 'hard', 'good', 'easy'
    const userId = req.currentUser!.userId;

    // Find or create progress record
    let progress = await CardProgressModel.findOne({ userId, cardId });

    if (!progress) {
      progress = new CardProgressModel({
        userId,
        cardId,
        masteryLevel: 0,
        timesStudied: 0,
        correctCount: 0,
        incorrectCount: 0,
        confidenceLevel: 'low'
      });
    }

    // Update counts
    progress.timesStudied += 1;
    if (difficulty === 'easy' || difficulty === 'good') {
      progress.correctCount += 1;
    } else {
      progress.incorrectCount += 1;
    }

    // Calculate current interval (days since last review)
    const currentInterval = progress.lastStudiedAt
      ? Math.max(1, Math.floor((Date.now() - progress.lastStudiedAt.getTime()) / (1000 * 60 * 60 * 24)))
      : 1;

    // Update fields
    progress.lastStudiedAt = new Date();
    progress.nextReviewDate = this.calculateNextReview(difficulty, currentInterval);
    progress.masteryLevel = this.calculateMasteryLevel(progress.correctCount, progress.incorrectCount, progress.timesStudied);
    progress.confidenceLevel = this.getConfidenceLevel(difficulty);
    progress.updatedAt = new Date();

    await progress.save();

    // Increment study count on the card itself
    await FlashcardModel.updateOne({ _id: cardId }, { $inc: { studyCount: 1 } });

    res.status(HTTP_STATUS.OK).json({
      message: 'Progress updated successfully',
      progress
    });
  }

  // Get user's progress for a specific card
  public async getCardProgress(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const userId = req.currentUser!.userId;

    const progress = await CardProgressModel.findOne({ userId, cardId });

    res.status(HTTP_STATUS.OK).json({
      message: 'Card progress retrieved',
      progress: progress || null
    });
  }

  // Get all progress for a user
  public async getUserProgress(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    if (userId !== req.currentUser!.userId) {
      res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Forbidden' });
      return;
    }

    const progressList = await CardProgressModel.find({ userId })
      .populate('cardId')
      .sort({ updatedAt: -1 });

    res.status(HTTP_STATUS.OK).json({
      message: 'User progress retrieved',
      progress: progressList
    });
  }

  // Get cards due for review
  public async getCardsDue(req: Request, res: Response): Promise<void> {
    const userId = req.currentUser!.userId;
    const now = new Date();

    // Get all cards the user has studied that are due for review
    const dueProgress = await CardProgressModel.find({
      userId,
      $or: [
        { nextReviewDate: { $lte: now } },
        { nextReviewDate: null }
      ]
    }).populate('cardId');

    // Also get cards the user hasn't studied yet (limit to 10)
    const studiedCardIds = await CardProgressModel.find({ userId }).distinct('cardId');
    const unstudiedCards = await FlashcardModel.find({
      _id: { $nin: studiedCardIds },
      privacy: 'public'
    }).limit(10);

    const dueCards = dueProgress.map((p: any) => p.cardId).filter(Boolean);
    const allDueCards = [...dueCards, ...unstudiedCards];

    res.status(HTTP_STATUS.OK).json({
      message: 'Cards due for review',
      cards: allDueCards,
      count: allDueCards.length
    });
  }

  // Get practice statistics
  public async getPracticeStats(req: Request, res: Response): Promise<void> {
    const userId = req.currentUser!.userId;

    const progressList = await CardProgressModel.find({ userId });
    const totalCards = await FlashcardModel.countDocuments({ privacy: 'public' });

    const studiedCards = progressList.length;
    const masteredCards = progressList.filter((p) => p.masteryLevel >= 5).length;

    const now = new Date();
    const cardsToReview = progressList.filter((p) => {
      return p.nextReviewDate && p.nextReviewDate <= now;
    }).length;

    // Calculate current streak (consecutive days studied)
    const sortedProgress = progressList.sort((a, b) => {
      const dateA = a.lastStudiedAt?.getTime() || 0;
      const dateB = b.lastStudiedAt?.getTime() || 0;
      return dateB - dateA;
    });

    let currentStreak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    for (const progress of sortedProgress) {
      if (!progress.lastStudiedAt) break;

      const studyDate = new Date(progress.lastStudiedAt);
      studyDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((checkDate.getTime() - studyDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === currentStreak) {
        currentStreak++;
      } else if (daysDiff > currentStreak) {
        break;
      }
    }

    res.status(HTTP_STATUS.OK).json({
      message: 'Practice statistics',
      stats: {
        totalCards,
        studiedCards,
        masteredCards,
        cardsToReview,
        currentStreak
      }
    });
  }

  // Reset progress for a card
  public async resetProgress(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const userId = req.currentUser!.userId;

    await CardProgressModel.deleteOne({ userId, cardId });

    res.status(HTTP_STATUS.OK).json({
      message: 'Progress reset successfully'
    });
  }
}
