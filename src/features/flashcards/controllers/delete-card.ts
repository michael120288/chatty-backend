import { Request, Response } from 'express';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import HTTP_STATUS from 'http-status-codes';
import { socketIOFlashcardObject } from '@socket/flashcard';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';

const flashcardCache: FlashcardCache = new FlashcardCache();

export class DeleteCard {
  public async card(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const userId = req.currentUser!.userId;

    const card = await FlashcardModel.findById(cardId);
    if (!card || card.userId.toString() !== userId) {
      res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Forbidden' });
      return;
    }

    socketIOFlashcardObject.emit('delete card', cardId);
    await flashcardCache.deleteCardFromCache(cardId, `${userId}`);
    flashcardQueue.addCardJob('deleteCardFromDB', { keyOne: cardId, keyTwo: userId });
    res.status(HTTP_STATUS.OK).json({ message: 'Card deleted successfully' });
  }
}
