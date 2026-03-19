/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as flashcardServer from '@socket/flashcard';
import { flashcardMockRequest, flashcardMockResponse } from '@root/mocks/flashcard.mock';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { CardReaction } from '@flashcards/controllers/card-reaction';
import { CardReactionModel } from '@flashcards/models/card-reaction.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { flashcardCache } from '@service/redis/flashcard.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/flashcard.cache');
jest.mock('@flashcards/models/card-reaction.schema');
jest.mock('@flashcards/models/flashcard.schema');

Object.defineProperties(flashcardServer, {
  socketIOFlashcardObject: {
    value: new Server(),
    writable: true
  }
});

const CARD_ID = '6027f77087c9d9ccb1555268';

describe('CardReaction', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('addReaction', () => {
    it('should create new reaction when none exists', async () => {
      const req: Request = flashcardMockRequest(
        { cardId: CARD_ID, type: 'like' },
        authUserPayload
      ) as Request;
      const res: Response = flashcardMockResponse();
      const newReaction = { _id: 'r1', type: 'like' };

      (CardReactionModel.findOne as jest.Mock).mockResolvedValue(null);
      (CardReactionModel.create as jest.Mock).mockResolvedValue(newReaction);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardReaction.prototype.addReaction(req, res);
      expect(CardReactionModel.create).toHaveBeenCalled();
      expect(FlashcardModel.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: expect.anything() }),
        { $inc: { likesCount: 1 } }
      );
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'add card reaction',
        expect.objectContaining({ cardId: CARD_ID })
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should update existing reaction without incrementing count', async () => {
      const req: Request = flashcardMockRequest(
        { cardId: CARD_ID, type: 'love' },
        authUserPayload
      ) as Request;
      const res: Response = flashcardMockResponse();
      const existingReaction = {
        _id: 'r1',
        type: 'like',
        save: jest.fn().mockResolvedValue({})
      };

      (CardReactionModel.findOne as jest.Mock).mockResolvedValue(existingReaction);
      jest.spyOn(flashcardQueue, 'addCardJob');
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');

      await CardReaction.prototype.addReaction(req, res);
      expect(existingReaction.save).toHaveBeenCalled();
      expect(FlashcardModel.updateOne).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 500 on error', async () => {
      const req: Request = flashcardMockRequest({ cardId: CARD_ID, type: 'like' }, authUserPayload) as Request;
      const res: Response = flashcardMockResponse();
      (CardReactionModel.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));

      await CardReaction.prototype.addReaction(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('removeReaction', () => {
    it('should remove reaction and decrement count', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, {
        cardId: CARD_ID,
        reactionType: 'like'
      }) as Request;
      const res: Response = flashcardMockResponse();
      const reaction = { _id: 'r1' };

      (CardReactionModel.findOneAndDelete as jest.Mock).mockResolvedValue(reaction);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardReaction.prototype.removeReaction(req, res);
      expect(FlashcardModel.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: expect.anything() }),
        { $inc: { likesCount: -1 } }
      );
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'remove card reaction',
        expect.objectContaining({ cardId: CARD_ID })
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 404 when reaction not found', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, {
        cardId: CARD_ID,
        reactionType: 'like'
      }) as Request;
      const res: Response = flashcardMockResponse();
      (CardReactionModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      await CardReaction.prototype.removeReaction(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getCardReactions', () => {
    it('should return all reactions for a card', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const reactions = [{ _id: 'r1', type: 'like' }];
      (CardReactionModel.find as jest.Mock).mockReturnValue({ sort: jest.fn().mockResolvedValue(reactions) });

      await CardReaction.prototype.getCardReactions(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ reactions }));
    });
  });

  describe('getSingleCardReaction', () => {
    it('should return the user reaction for a card', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const reaction = { _id: 'r1', type: 'like' };
      (CardReactionModel.findOne as jest.Mock).mockResolvedValue(reaction);

      await CardReaction.prototype.getSingleCardReaction(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ reaction }));
    });

    it('should return null when no reaction found', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardReactionModel.findOne as jest.Mock).mockResolvedValue(null);

      await CardReaction.prototype.getSingleCardReaction(req, res);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ reaction: null }));
    });
  });
});
