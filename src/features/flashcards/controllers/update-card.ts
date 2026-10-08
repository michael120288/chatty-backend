import { Request, Response } from 'express';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import HTTP_STATUS from 'http-status-codes';
import { socketIOFlashcardObject } from '@socket/flashcard';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { cardSchema } from '@flashcards/schemas/card.schemes';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { IFlashcardDocument } from '@flashcards/interfaces/flashcard.interface';

const flashcardCache: FlashcardCache = new FlashcardCache();

export class UpdateCard {
  @joiValidation(cardSchema)
  public async card(req: Request, res: Response): Promise<void> {
    const {
      question,
      answer,
      category,
      questionCodeSnippet,
      answerCodeSnippet,
      privacy,
      difficulty,
      questionImgVersion,
      questionImgId,
      answerImgVersion,
      answerImgId
    } = req.body;
    const { cardId } = req.params;

    const updatedCard: IFlashcardDocument = {
      question,
      answer,
      category,
      questionCodeSnippet: questionCodeSnippet || '',
      answerCodeSnippet: answerCodeSnippet || '',
      privacy: privacy || 'public',
      difficulty: difficulty || '',
      questionImgVersion: questionImgVersion || '',
      questionImgId: questionImgId || '',
      answerImgVersion: answerImgVersion || '',
      answerImgId: answerImgId || ''
    } as IFlashcardDocument;

    const cardUpdated: IFlashcardDocument = await flashcardCache.updateCardInCache(cardId, updatedCard);
    socketIOFlashcardObject.emit('update card', cardUpdated);
    flashcardQueue.addCardJob('updateCardInDB', { key: cardId, value: cardUpdated, userId: req.currentUser?.userId });

    res.status(HTTP_STATUS.OK).json({ message: 'Card updated successfully' });
  }
}
