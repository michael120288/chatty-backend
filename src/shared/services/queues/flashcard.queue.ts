import { IFlashcardJobData } from '@flashcards/interfaces/flashcard.interface';
import { ICardBookmarkJob } from '@flashcards/interfaces/card-bookmark.interface';
import { ICardReactionJob } from '@flashcards/interfaces/card-reaction.interface';
import { ICardCommentJob } from '@flashcards/interfaces/card-comment.interface';
import { BaseQueue } from '@service/queues/base.queue';
import { flashcardWorker } from '@worker/flashcard.worker';

class FlashcardQueue extends BaseQueue {
  constructor() {
    super('flashcards');
    this.processJob('addCardToDB', 5, flashcardWorker.saveCardToDB);
    this.processJob('deleteCardFromDB', 5, flashcardWorker.deleteCardFromDB);
    this.processJob('updateCardInDB', 5, flashcardWorker.updateCardInDB);
    this.processJob('addBookmarkToDB', 5, flashcardWorker.addBookmarkToDB);
    this.processJob('removeBookmarkFromDB', 5, flashcardWorker.removeBookmarkFromDB);
    this.processJob('addReactionToDB', 5, flashcardWorker.addReactionToDB);
    this.processJob('removeReactionFromDB', 5, flashcardWorker.removeReactionFromDB);
    this.processJob('addCommentToDB', 5, flashcardWorker.addCommentToDB);
    this.processJob('deleteCommentFromDB', 5, flashcardWorker.deleteCommentFromDB);
  }

  public addCardJob(
    name: string,
    data: IFlashcardJobData | ICardBookmarkJob | ICardReactionJob | ICardCommentJob
  ): void {
    this.addJob(name, data);
  }
}

export const flashcardQueue: FlashcardQueue = new FlashcardQueue();
