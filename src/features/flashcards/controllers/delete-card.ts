import { Request, Response } from 'express';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import HTTP_STATUS from 'http-status-codes';
import { socketIOFlashcardObject } from '@socket/flashcard';
import { flashcardQueue } from '@service/queues/flashcard.queue';

const flashcardCache: FlashcardCache = new FlashcardCache();

export class DeleteCard {
  public async card(req: Request, res: Response): Promise<void> {
    socketIOFlashcardObject.emit('delete card', req.params.cardId);
    await flashcardCache.deleteCardFromCache(req.params.cardId, `${req.currentUser!.userId}`);
    flashcardQueue.addCardJob('deleteCardFromDB', { keyOne: req.params.cardId, keyTwo: req.currentUser!.userId });
    res.status(HTTP_STATUS.OK).json({ message: 'Card deleted successfully' });
  }
}
