import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as flashcardServer from '@socket/flashcard';
import { flashcardMockRequest, flashcardMockResponse } from '@root/mocks/flashcard.mock';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { DeleteCard } from '@flashcards/controllers/delete-card';
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

describe('DeleteCard', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('card', () => {
    it('should emit socket event with cardId', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(FlashcardCache.prototype, 'deleteCardFromCache').mockResolvedValue(undefined);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await DeleteCard.prototype.card(req, res);
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith('delete card', req.params!.cardId);
    });

    it('should call deleteCardFromCache with cardId and userId', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'deleteCardFromCache').mockResolvedValue(undefined);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await DeleteCard.prototype.card(req, res);
      expect(FlashcardCache.prototype.deleteCardFromCache).toHaveBeenCalledWith(
        req.params!.cardId,
        `${req.currentUser!.userId}`
      );
    });

    it('should add deleteCardFromDB job to queue', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'deleteCardFromCache').mockResolvedValue(undefined);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await DeleteCard.prototype.card(req, res);
      expect(flashcardQueue.addCardJob).toHaveBeenCalledWith('deleteCardFromDB', {
        keyOne: req.params!.cardId,
        keyTwo: req.currentUser!.userId
      });
    });

    it('should return 200 with success message', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'deleteCardFromCache').mockResolvedValue(undefined);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await DeleteCard.prototype.card(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Card deleted successfully' });
    });
  });
});
