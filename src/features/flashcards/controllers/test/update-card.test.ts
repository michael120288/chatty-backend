import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as flashcardServer from '@socket/flashcard';
import { newCard, flashcardMockRequest, flashcardMockResponse, cardMockData } from '@root/mocks/flashcard.mock';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { UpdateCard } from '@flashcards/controllers/update-card';
import { FlashcardCache } from '@service/redis/flashcard.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/flashcard.cache');

Object.defineProperties(flashcardServer, {
  socketIOFlashcardObject: {
    value: new Server(),
    writable: true
  }
});

describe('UpdateCard', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('card', () => {
    it('should call updateCardInCache with cardId and updated data', async () => {
      const req: Request = flashcardMockRequest(newCard, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'updateCardInCache').mockResolvedValue(cardMockData);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await UpdateCard.prototype.card(req, res);
      expect(FlashcardCache.prototype.updateCardInCache).toHaveBeenCalledWith(
        req.params!.cardId,
        expect.objectContaining({ question: newCard.question, answer: newCard.answer })
      );
    });

    it('should emit socket event with updated card', async () => {
      const req: Request = flashcardMockRequest(newCard, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'updateCardInCache').mockResolvedValue(cardMockData);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await UpdateCard.prototype.card(req, res);
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith('update card', cardMockData);
    });

    it('should add updateCardInDB job to queue', async () => {
      const req: Request = flashcardMockRequest(newCard, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'updateCardInCache').mockResolvedValue(cardMockData);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await UpdateCard.prototype.card(req, res);
      expect(flashcardQueue.addCardJob).toHaveBeenCalledWith('updateCardInDB', {
        key: req.params!.cardId,
        value: cardMockData
      });
    });

    it('should return 200 with success message', async () => {
      const req: Request = flashcardMockRequest(newCard, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'updateCardInCache').mockResolvedValue(cardMockData);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await UpdateCard.prototype.card(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Card updated successfully' });
    });
  });
});
