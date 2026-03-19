/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as flashcardServer from '@socket/flashcard';
import { flashcardMockRequest, flashcardMockResponse } from '@root/mocks/flashcard.mock';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { CardComment } from '@flashcards/controllers/card-comment';
import { CardCommentModel } from '@flashcards/models/card-comment.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { flashcardCache } from '@service/redis/flashcard.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/flashcard.cache');
jest.mock('@flashcards/models/card-comment.schema');
jest.mock('@flashcards/models/flashcard.schema');

Object.defineProperties(flashcardServer, {
  socketIOFlashcardObject: {
    value: new Server(),
    writable: true
  }
});

const CARD_ID = '6027f77087c9d9ccb1555268';
const COMMENT_ID = '507f1f77bcf86cd799439011';

describe('CardComment', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('addComment', () => {
    it('should create comment, increment count, and emit socket event', async () => {
      const req: Request = flashcardMockRequest(
        { cardId: CARD_ID, comment: 'Great card!' },
        authUserPayload
      ) as Request;
      const res: Response = flashcardMockResponse();

      (CardCommentModel.create as jest.Mock).mockResolvedValue({ _id: COMMENT_ID, comment: 'Great card!' });
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardComment.prototype.addComment(req, res);
      expect(CardCommentModel.create).toHaveBeenCalled();
      expect(FlashcardModel.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: expect.anything() }),
        { $inc: { commentsCount: 1 } }
      );
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'add card comment',
        expect.objectContaining({ cardId: CARD_ID })
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should queue the addCommentToDB job', async () => {
      const req: Request = flashcardMockRequest(
        { cardId: CARD_ID, comment: 'Great card!' },
        authUserPayload
      ) as Request;
      const res: Response = flashcardMockResponse();
      (CardCommentModel.create as jest.Mock).mockResolvedValue({});
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardComment.prototype.addComment(req, res);
      expect(flashcardQueue.addCardJob).toHaveBeenCalledWith(
        'addCommentToDB',
        expect.objectContaining({ cardId: CARD_ID, comment: 'Great card!' })
      );
    });
  });

  describe('getCardComments', () => {
    it('should return paginated comments', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      (req as any).query = { page: '1' };
      const res: Response = flashcardMockResponse();
      const comments = [{ _id: COMMENT_ID, comment: 'Nice!' }];

      (CardCommentModel.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(comments)
          })
        })
      });
      (CardCommentModel.countDocuments as jest.Mock).mockResolvedValue(1);

      await CardComment.prototype.getCardComments(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ comments }));
    });
  });

  describe('deleteComment', () => {
    it('should delete comment and decrement count', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { commentId: COMMENT_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const comment = {
        _id: COMMENT_ID,
        cardId: { toString: () => CARD_ID },
        comment: 'Old comment'
      };

      (CardCommentModel.findOneAndDelete as jest.Mock).mockResolvedValue(comment);
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});
      (flashcardCache.updateCardCounter as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CardComment.prototype.deleteComment(req, res);
      expect(FlashcardModel.updateOne).toHaveBeenCalledWith(
        { _id: comment.cardId },
        { $inc: { commentsCount: -1 } }
      );
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'delete card comment',
        expect.objectContaining({ commentId: COMMENT_ID })
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 404 when comment not found or no permission', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { commentId: COMMENT_ID }) as Request;
      const res: Response = flashcardMockResponse();
      (CardCommentModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      await CardComment.prototype.deleteComment(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('updateComment', () => {
    it('should update comment and emit socket event', async () => {
      const req: Request = flashcardMockRequest(
        { comment: 'Updated comment', cardId: CARD_ID },
        authUserPayload,
        { commentId: COMMENT_ID }
      ) as Request;
      const res: Response = flashcardMockResponse();
      const updatedComment = {
        _id: COMMENT_ID,
        cardId: CARD_ID,
        comment: 'Updated comment'
      };

      (CardCommentModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedComment);
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');

      await CardComment.prototype.updateComment(req, res);
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith(
        'update card comment',
        expect.objectContaining({ comment: updatedComment })
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 404 when comment not found or no permission', async () => {
      const req: Request = flashcardMockRequest(
        { comment: 'Updated', cardId: CARD_ID },
        authUserPayload,
        { commentId: COMMENT_ID }
      ) as Request;
      const res: Response = flashcardMockResponse();
      (CardCommentModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      await CardComment.prototype.updateComment(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getCommentNames', () => {
    it('should return unique commenter usernames', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: CARD_ID }) as Request;
      const res: Response = flashcardMockResponse();
      const comments = [{ username: 'Manny' }, { username: 'Danny' }, { username: 'Manny' }];

      (CardCommentModel.find as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(comments)
        })
      });

      await CardComment.prototype.getCommentNames(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ count: 2, names: ['Manny', 'Danny'] })
      );
    });
  });
});
