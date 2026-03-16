import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { flashcardService } from '@service/db/flashcard.service';

const log: Logger = config.createLogger('flashcardWorker');

class FlashcardWorker {
  async saveCardToDB(job: Job): Promise<void> {
    const { key, value } = job.data;
    await flashcardService.addCardToDB(key, value);
    job.progress(100);
  }

  async deleteCardFromDB(job: Job): Promise<void> {
    const { keyOne, keyTwo } = job.data;
    await flashcardService.deleteCard(keyOne, keyTwo);
    job.progress(100);
  }

  async updateCardInDB(job: Job): Promise<void> {
    const { key, value } = job.data;
    await flashcardService.editCard(key, value);
    job.progress(100);
  }

  async addBookmarkToDB(job: Job): Promise<void> {
    const { userId, cardId, type } = job.data;
    if (type === 'add') {
      await flashcardService.addBookmark(userId, cardId);
    }
    job.progress(100);
  }

  async removeBookmarkFromDB(job: Job): Promise<void> {
    const { userId, cardId, type } = job.data;
    if (type === 'remove') {
      await flashcardService.removeBookmark(userId, cardId);
    }
    job.progress(100);
  }

  async addReactionToDB(job: Job): Promise<void> {
    const { cardId, userId, username, type } = job.data;
    await flashcardService.addReaction(cardId, userId, username, type);
    job.progress(100);
  }

  async removeReactionFromDB(job: Job): Promise<void> {
    const { cardId, userId, type } = job.data;
    await flashcardService.removeReaction(cardId, userId, type);
    job.progress(100);
  }

  async addCommentToDB(job: Job): Promise<void> {
    const { cardId, userId, username, comment, avatarColor, profilePicture } = job.data;
    await flashcardService.addComment(cardId, userId, username, comment, avatarColor, profilePicture);
    job.progress(100);
  }

  async deleteCommentFromDB(job: Job): Promise<void> {
    const { cardId, userId } = job.data;
    await flashcardService.deleteComment(cardId, userId);
    job.progress(100);
  }
}

export const flashcardWorker: FlashcardWorker = new FlashcardWorker();
