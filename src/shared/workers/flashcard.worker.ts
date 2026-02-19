import { Job, DoneCallback } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { flashcardService } from '@service/db/flashcard.service';

const log: Logger = config.createLogger('flashcardWorker');

class FlashcardWorker {
  async saveCardToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      await flashcardService.addCardToDB(key, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async deleteCardFromDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { keyOne, keyTwo } = job.data;
      await flashcardService.deleteCard(keyOne, keyTwo);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async updateCardInDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      await flashcardService.editCard(key, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async addBookmarkToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { userId, cardId, type } = job.data;
      if (type === 'add') {
        await flashcardService.addBookmark(userId, cardId);
      }
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async removeBookmarkFromDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { userId, cardId, type } = job.data;
      if (type === 'remove') {
        await flashcardService.removeBookmark(userId, cardId);
      }
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async addReactionToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { cardId, userId, username, type } = job.data;
      await flashcardService.addReaction(cardId, userId, username, type);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async removeReactionFromDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { cardId, userId, type } = job.data;
      await flashcardService.removeReaction(cardId, userId, type);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async addCommentToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { cardId, userId, username, comment, avatarColor, profilePicture } = job.data;
      await flashcardService.addComment(cardId, userId, username, comment, avatarColor, profilePicture);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async deleteCommentFromDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { cardId, userId } = job.data;
      await flashcardService.deleteComment(cardId, userId);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const flashcardWorker: FlashcardWorker = new FlashcardWorker();
