import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IFlashcardDocument } from '@flashcards/interfaces/flashcard.interface';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import { flashcardService } from '@service/db/flashcard.service';

const flashcardCache: FlashcardCache = new FlashcardCache();
const PAGE_SIZE = 10;

export class GetCards {
  public async cards(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;
    let cards: IFlashcardDocument[] = [];
    let totalCards = 0;

    const cachedCards: IFlashcardDocument[] = await flashcardCache.getCardsFromCache('flashcard', newSkip, limit);
    if (cachedCards.length) {
      cards = cachedCards;
      totalCards = cachedCards.length;
    } else {
      cards = await flashcardService.getCards({ privacy: 'public' }, skip, limit, { createdAt: -1 });
      totalCards = await flashcardService.cardsCount();
    }

    res.status(HTTP_STATUS.OK).json({ message: 'All cards', cards, totalCards });
  }

  public async cardsByCategory(req: Request, res: Response): Promise<void> {
    const { category, page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);

    const cards: IFlashcardDocument[] = await flashcardService.getCards({ category, privacy: 'public' }, skip, limit, {
      createdAt: -1
    });

    res.status(HTTP_STATUS.OK).json({ message: `Cards in category: ${category}`, cards });
  }

  public async cardsByUser(req: Request, res: Response): Promise<void> {
    const { userId, page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);

    const cards: IFlashcardDocument[] = await flashcardService.getCards({ userId }, skip, limit, { createdAt: -1 });

    res.status(HTTP_STATUS.OK).json({ message: `User cards`, cards });
  }

  public async singleCard(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    const cards: IFlashcardDocument[] = await flashcardService.getCards({ _id: cardId }, 0, 1, { createdAt: -1 });
    const card = cards.length > 0 ? cards[0] : null;

    res.status(HTTP_STATUS.OK).json({ message: 'Card details', card });
  }
}
