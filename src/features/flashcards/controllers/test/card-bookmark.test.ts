/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as flashcardServer from '@socket/flashcard';
import { flashcardMockRequest, flashcardMockResponse } from '@root/mocks/flashcard.mock';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { CardBookmark } from '@flashcards/controllers/card-bookmark';
import { CardBookmarkModel } from '@flashcards/models/card-bookmark.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { flashcardCache } from '@service/redis/flashcard.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/flashcard.cache');
jest.mock('@flashcards/models/card-bookmark.schema');
jest.mock('@flashcards/models/flashcard.schema');

Object.defineProperties(flashcardServer, {
  socketIOFlashcardObject: {
    value: new Server(),
    writable: true
  }
});

const CARD_ID = '6027f77087c9d9ccb1555268';

describe('CardBookmark', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('toggleBookmark', () => {
    it('should add bookmark when none exists and return 201', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const mockBookmark = { _id: 'bookmark1' };

      (CardBookmarkModel.findOne as jest.Mock).mockResolvedValue(null);
      (CardBookmarkModel.create as jest.Mock).mockResolvedValue(mockBookmark);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardBookmark.prototype.toggleBookmark(req, res);
      expect(CardBookmarkModel.create).toHaveBeenCalled();
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'bookmark card',
        expect.objectContaining({ cardId: CARD_ID })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ bookmarked: true }));
    });

    it('should remove bookmark when one exists and return 200', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const existingBookmark = { _id: 'bookmark1' };

      (CardBookmarkModel.findOne as jest.Mock).mockResolvedValue(existingBookmark);
      (CardBookmarkModel.deleteOne as jest.Mock).mockResolvedValue({});
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardBookmark.prototype.toggleBookmark(req, res);
      expect(CardBookmarkModel.deleteOne).toHaveBeenCalledWith({ _id: existingBookmark._id });
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'unbookmark card',
        expect.objectContaining({ cardId: CARD_ID })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ bookmarked: false }));
    });

    it('should return 500 on error', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardBookmarkModel.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));

      await CardBookmark.prototype.toggleBookmark(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('checkBookmark', () => {
    it('should return bookmarked: true when bookmark exists', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const bookmark = { _id: 'bookmark1' };
      (CardBookmarkModel.findOne as jest.Mock).mockResolvedValue(bookmark);

      await CardBookmark.prototype.checkBookmark(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ bookmarked: true, bookmarkId: 'bookmark1' });
    });

    it('should return bookmarked: false when no bookmark', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardBookmarkModel.findOne as jest.Mock).mockResolvedValue(null);

      await CardBookmark.prototype.checkBookmark(req, res);
      expect(res.json).toHaveBeenCalledWith({ bookmarked: false, bookmarkId: null });
    });
  });

  describe('getBookmarkCount', () => {
    it('should return bookmark count for a card', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardBookmarkModel.countDocuments as jest.Mock).mockResolvedValue(5);

      await CardBookmark.prototype.getBookmarkCount(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ cardId: CARD_ID, bookmarkCount: 5 });
    });
  });
});
