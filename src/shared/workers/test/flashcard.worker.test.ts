import { flashcardWorker } from '@worker/flashcard.worker';
import { flashcardService } from '@service/db/flashcard.service';

jest.mock('@service/db/flashcard.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('FlashcardWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('saveCardToDB', () => {
    it('calls flashcardService.addCardToDB with key and value', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'user1', value: { title: 'Card 1' } });
      (flashcardService.addCardToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.saveCardToDB(job, done);

      expect(flashcardService.addCardToDB).toHaveBeenCalledWith('user1', { title: 'Card 1' });
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'k', value: {} });
      const err = new Error('DB error');
      (flashcardService.addCardToDB as jest.Mock).mockRejectedValueOnce(err);
      await flashcardWorker.saveCardToDB(job, done);
      expect(done).toHaveBeenCalledWith(err);
    });
  });

  describe('deleteCardFromDB', () => {
    it('calls flashcardService.deleteCard with keyOne and keyTwo', async () => {
      const done = jest.fn();
      const job = mockJob({ keyOne: 'card1', keyTwo: 'user1' });
      (flashcardService.deleteCard as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.deleteCardFromDB(job, done);

      expect(flashcardService.deleteCard).toHaveBeenCalledWith('card1', 'user1');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('updateCardInDB', () => {
    it('calls flashcardService.editCard with key and value', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'card1', value: { title: 'Updated' } });
      (flashcardService.editCard as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.updateCardInDB(job, done);

      expect(flashcardService.editCard).toHaveBeenCalledWith('card1', { title: 'Updated' });
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('addBookmarkToDB', () => {
    it('calls flashcardService.addBookmark when type is "add"', async () => {
      const done = jest.fn();
      const job = mockJob({ userId: 'u1', cardId: 'c1', type: 'add' });
      (flashcardService.addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.addBookmarkToDB(job, done);

      expect(flashcardService.addBookmark).toHaveBeenCalledWith('u1', 'c1');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('does not call addBookmark when type is not "add"', async () => {
      const done = jest.fn();
      const job = mockJob({ userId: 'u1', cardId: 'c1', type: 'other' });

      await flashcardWorker.addBookmarkToDB(job, done);

      expect(flashcardService.addBookmark).not.toHaveBeenCalled();
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('removeBookmarkFromDB', () => {
    it('calls flashcardService.removeBookmark when type is "remove"', async () => {
      const done = jest.fn();
      const job = mockJob({ userId: 'u1', cardId: 'c1', type: 'remove' });
      (flashcardService.removeBookmark as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.removeBookmarkFromDB(job, done);

      expect(flashcardService.removeBookmark).toHaveBeenCalledWith('u1', 'c1');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('does not call removeBookmark when type is not "remove"', async () => {
      const done = jest.fn();
      const job = mockJob({ userId: 'u1', cardId: 'c1', type: 'other' });

      await flashcardWorker.removeBookmarkFromDB(job, done);

      expect(flashcardService.removeBookmark).not.toHaveBeenCalled();
    });
  });

  describe('addReactionToDB', () => {
    it('calls flashcardService.addReaction with correct args', async () => {
      const done = jest.fn();
      const job = mockJob({ cardId: 'c1', userId: 'u1', username: 'Alice', type: 'like' });
      (flashcardService.addReaction as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.addReactionToDB(job, done);

      expect(flashcardService.addReaction).toHaveBeenCalledWith('c1', 'u1', 'Alice', 'like');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('removeReactionFromDB', () => {
    it('calls flashcardService.removeReaction with correct args', async () => {
      const done = jest.fn();
      const job = mockJob({ cardId: 'c1', userId: 'u1', type: 'like' });
      (flashcardService.removeReaction as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.removeReactionFromDB(job, done);

      expect(flashcardService.removeReaction).toHaveBeenCalledWith('c1', 'u1', 'like');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('addCommentToDB', () => {
    it('calls flashcardService.addComment with all fields', async () => {
      const done = jest.fn();
      const job = mockJob({
        cardId: 'c1', userId: 'u1', username: 'Alice',
        comment: 'Great!', avatarColor: '#fff', profilePicture: 'pic.jpg'
      });
      (flashcardService.addComment as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.addCommentToDB(job, done);

      expect(flashcardService.addComment).toHaveBeenCalledWith('c1', 'u1', 'Alice', 'Great!', '#fff', 'pic.jpg');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('deleteCommentFromDB', () => {
    it('calls flashcardService.deleteComment with cardId and userId', async () => {
      const done = jest.fn();
      const job = mockJob({ cardId: 'c1', userId: 'u1' });
      (flashcardService.deleteComment as jest.Mock).mockResolvedValueOnce(undefined);

      await flashcardWorker.deleteCommentFromDB(job, done);

      expect(flashcardService.deleteComment).toHaveBeenCalledWith('c1', 'u1');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });
});
