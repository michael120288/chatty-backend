import { flashcardService } from '@service/db/flashcard.service';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { CardBookmarkModel } from '@flashcards/models/card-bookmark.schema';
import { CardReactionModel } from '@flashcards/models/card-reaction.schema';
import { CardCommentModel } from '@flashcards/models/card-comment.schema';
import { UserModel } from '@user/models/user.schema';
import { cardMockData } from '@root/mocks/flashcard.mock';
import { authUserPayload } from '@root/mocks/auth.mock';

jest.mock('@flashcards/models/flashcard.schema');
jest.mock('@flashcards/models/card-bookmark.schema');
jest.mock('@flashcards/models/card-reaction.schema');
jest.mock('@flashcards/models/card-comment.schema');
jest.mock('@user/models/user.schema');

const CARD_ID = '6027f77087c9d9ccb1555268';
const USER_ID = authUserPayload.userId;

describe('FlashcardService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addCardToDB', () => {
    it('should create a card and increment user cardsCount', async () => {
      (FlashcardModel.create as jest.Mock).mockResolvedValue(cardMockData);
      (UserModel.updateOne as jest.Mock).mockResolvedValue({});

      await flashcardService.addCardToDB(USER_ID, cardMockData);
      expect(FlashcardModel.create).toHaveBeenCalledWith(cardMockData);
      expect(UserModel.updateOne).toHaveBeenCalledWith({ _id: USER_ID }, { $inc: { cardsCount: 1 } });
    });
  });

  describe('getCards', () => {
    it('should aggregate cards with query, sort, skip, limit', async () => {
      const mockAggregate = jest.fn().mockResolvedValue([cardMockData]);
      (FlashcardModel.aggregate as jest.Mock) = mockAggregate;

      const result = await flashcardService.getCards({ privacy: 'public' }, 0, 10, { createdAt: -1 });
      expect(mockAggregate).toHaveBeenCalledWith([
        { $match: { privacy: 'public' } },
        { $sort: { createdAt: -1 } },
        { $skip: 0 },
        { $limit: 10 }
      ]);
      expect(result).toEqual([cardMockData]);
    });
  });

  describe('cardsCount', () => {
    it('should return the count of all cards', async () => {
      (FlashcardModel.find as jest.Mock).mockReturnValue({ countDocuments: jest.fn().mockResolvedValue(42) });

      const count = await flashcardService.cardsCount();
      expect(count).toEqual(42);
    });
  });

  describe('deleteCard', () => {
    it('should delete card and decrement user cardsCount', async () => {
      (FlashcardModel.deleteOne as jest.Mock).mockResolvedValue({});
      (UserModel.updateOne as jest.Mock).mockResolvedValue({});

      await flashcardService.deleteCard(CARD_ID, USER_ID);
      expect(FlashcardModel.deleteOne).toHaveBeenCalledWith({ _id: CARD_ID });
      expect(UserModel.updateOne).toHaveBeenCalledWith({ _id: USER_ID }, { $inc: { cardsCount: -1 } });
    });
  });

  describe('editCard', () => {
    it('should call updateOne with the updated card data', async () => {
      (FlashcardModel.updateOne as jest.Mock).mockResolvedValue({});

      await flashcardService.editCard(CARD_ID, cardMockData);
      expect(FlashcardModel.updateOne).toHaveBeenCalledWith(
        { _id: CARD_ID },
        expect.objectContaining({ $set: expect.objectContaining({ question: cardMockData.question }) })
      );
    });
  });

  describe('addBookmark', () => {
    it('should create a bookmark record', async () => {
      (CardBookmarkModel.create as jest.Mock).mockResolvedValue({});

      await flashcardService.addBookmark(USER_ID, CARD_ID);
      expect(CardBookmarkModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: expect.anything(), cardId: expect.anything() })
      );
    });
  });

  describe('removeBookmark', () => {
    it('should delete a bookmark record', async () => {
      (CardBookmarkModel.deleteOne as jest.Mock).mockResolvedValue({});

      await flashcardService.removeBookmark(USER_ID, CARD_ID);
      expect(CardBookmarkModel.deleteOne).toHaveBeenCalledWith(
        expect.objectContaining({ userId: expect.anything(), cardId: expect.anything() })
      );
    });
  });

  describe('addReaction', () => {
    it('should upsert reaction record', async () => {
      (CardReactionModel.updateOne as jest.Mock).mockResolvedValue({});

      await flashcardService.addReaction(CARD_ID, USER_ID, 'Manny', 'like');
      expect(CardReactionModel.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({ userId: expect.anything(), cardId: expect.anything() }),
        expect.objectContaining({ $set: expect.objectContaining({ type: 'like' }) }),
        { upsert: true }
      );
    });
  });

  describe('removeReaction', () => {
    it('should delete reaction record', async () => {
      (CardReactionModel.deleteOne as jest.Mock).mockResolvedValue({});

      await flashcardService.removeReaction(CARD_ID, USER_ID, 'like');
      expect(CardReactionModel.deleteOne).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'like' })
      );
    });
  });

  describe('addComment', () => {
    it('should create a comment record', async () => {
      (CardCommentModel.create as jest.Mock).mockResolvedValue({});

      await flashcardService.addComment(CARD_ID, USER_ID, 'Manny', 'Great card!', '#9c27b0');
      expect(CardCommentModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ comment: 'Great card!', username: 'Manny' })
      );
    });
  });

  describe('deleteComment', () => {
    it('should delete comment by cardId and userId', async () => {
      (CardCommentModel.deleteOne as jest.Mock).mockResolvedValue({});

      await flashcardService.deleteComment(CARD_ID, USER_ID);
      expect(CardCommentModel.deleteOne).toHaveBeenCalledWith(
        expect.objectContaining({ userId: expect.anything(), cardId: expect.anything() })
      );
    });
  });
});
