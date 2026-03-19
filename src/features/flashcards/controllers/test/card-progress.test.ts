/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { flashcardMockRequest, flashcardMockResponse } from '@root/mocks/flashcard.mock';
import { CardProgress } from '@flashcards/controllers/card-progress';
import { CardProgressModel } from '@flashcards/models/card-progress.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';

jest.useFakeTimers();
jest.mock('@flashcards/models/card-progress.schema');
jest.mock('@flashcards/models/flashcard.schema');

const CARD_ID = '6027f77087c9d9ccb1555268';

describe('CardProgress', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('updateProgress', () => {
    it('should create progress record if none exists', async () => {
      const req: Request = flashcardMockRequest({ difficulty: 'good' }, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();

      const mockProgress = {
        timesStudied: 0,
        correctCount: 0,
        incorrectCount: 0,
        save: jest.fn().mockResolvedValue({})
      };

      (CardProgressModel.findOne as jest.Mock).mockResolvedValue(null);
      (CardProgressModel as any).mockImplementation(() => mockProgress);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});

      await CardProgress.prototype.updateProgress(req, res);
      expect(mockProgress.save).toHaveBeenCalled();
      expect(mockProgress.correctCount).toEqual(1);
      expect(FlashcardModel.updateOne).toHaveBeenCalledWith({ _id: CARD_ID }, { $inc: { studyCount: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should update existing progress record', async () => {
      const req: Request = flashcardMockRequest({ difficulty: 'hard' }, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();

      const existingProgress = {
        timesStudied: 5,
        correctCount: 3,
        incorrectCount: 2,
        lastStudiedAt: new Date(Date.now() - 86400000),
        save: jest.fn().mockResolvedValue({})
      };

      (CardProgressModel.findOne as jest.Mock).mockResolvedValue(existingProgress);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});

      await CardProgress.prototype.updateProgress(req, res);
      expect(existingProgress.timesStudied).toEqual(6);
      expect(existingProgress.incorrectCount).toEqual(3);
      expect(existingProgress.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should increment correctCount for easy/good difficulty', async () => {
      const req: Request = flashcardMockRequest({ difficulty: 'easy' }, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();

      const mockProgress = {
        timesStudied: 0,
        correctCount: 0,
        incorrectCount: 0,
        save: jest.fn().mockResolvedValue({})
      };

      (CardProgressModel.findOne as jest.Mock).mockResolvedValue(null);
      (CardProgressModel as any).mockImplementation(() => mockProgress);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});

      await CardProgress.prototype.updateProgress(req, res);
      expect(mockProgress.correctCount).toEqual(1);
      expect(mockProgress.incorrectCount).toEqual(0);
    });

    it('should increment incorrectCount for again difficulty', async () => {
      const req: Request = flashcardMockRequest({ difficulty: 'again' }, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();

      const mockProgress = {
        timesStudied: 0,
        correctCount: 0,
        incorrectCount: 0,
        save: jest.fn().mockResolvedValue({})
      };

      (CardProgressModel.findOne as jest.Mock).mockResolvedValue(null);
      (CardProgressModel as any).mockImplementation(() => mockProgress);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});

      await CardProgress.prototype.updateProgress(req, res);
      expect(mockProgress.incorrectCount).toEqual(1);
      expect(mockProgress.correctCount).toEqual(0);
    });
  });

  describe('getCardProgress', () => {
    it('should return progress for a card', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const progress = { _id: 'p1', cardId: CARD_ID, masteryLevel: 3 };
      (CardProgressModel.findOne as jest.Mock).mockResolvedValue(progress);

      await CardProgress.prototype.getCardProgress(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ progress }));
    });

    it('should return null when no progress found', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardProgressModel.findOne as jest.Mock).mockResolvedValue(null);

      await CardProgress.prototype.getCardProgress(req, res);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ progress: null }));
    });
  });

  describe('getUserProgress', () => {
    it('should return all progress for a user', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { userId: authUserPayload.userId }) as Request;
      const res: Response = flashcardMockResponse();
      const progressList = [{ _id: 'p1', masteryLevel: 2 }];
      (CardProgressModel.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(progressList)
        })
      });

      await CardProgress.prototype.getUserProgress(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ progress: progressList }));
    });
  });

  describe('resetProgress', () => {
    it('should delete progress record and return 200', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardProgressModel.deleteOne as jest.Mock).mockResolvedValue({});

      await CardProgress.prototype.resetProgress(req, res);
      expect(CardProgressModel.deleteOne).toHaveBeenCalledWith({
        userId: authUserPayload.userId,
        cardId: CARD_ID
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Progress reset successfully' });
    });
  });
});
