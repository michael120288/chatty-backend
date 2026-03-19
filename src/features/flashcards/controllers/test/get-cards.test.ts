import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { flashcardMockRequest, flashcardMockResponse, cardMockData } from '@root/mocks/flashcard.mock';
import { GetCards } from '@flashcards/controllers/get-cards';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import { flashcardService } from '@service/db/flashcard.service';

jest.useFakeTimers();
jest.mock('@service/redis/flashcard.cache');
jest.mock('@service/db/flashcard.service');

describe('GetCards', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('cards', () => {
    it('should return cards from cache when cache is populated', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { page: '1' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'getCardsFromCache').mockResolvedValue([cardMockData]);

      await GetCards.prototype.cards(req, res);
      expect(FlashcardCache.prototype.getCardsFromCache).toHaveBeenCalledWith('flashcard', 0, 10);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'All cards', cards: [cardMockData], totalCards: 1 })
      );
    });

    it('should fall back to DB when cache is empty', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { page: '1' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(FlashcardCache.prototype, 'getCardsFromCache').mockResolvedValue([]);
      jest.spyOn(flashcardService, 'getCards').mockResolvedValue([cardMockData]);
      jest.spyOn(flashcardService, 'cardsCount').mockResolvedValue(1);

      await GetCards.prototype.cards(req, res);
      expect(flashcardService.getCards).toHaveBeenCalledWith({ privacy: 'public' }, 0, 10, { createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ cards: [cardMockData], totalCards: 1 })
      );
    });
  });

  describe('cardsByCategory', () => {
    it('should return cards filtered by category', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { category: 'JavaScript', page: '1' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardService, 'getCards').mockResolvedValue([cardMockData]);

      await GetCards.prototype.cardsByCategory(req, res);
      expect(flashcardService.getCards).toHaveBeenCalledWith(
        { category: 'JavaScript', privacy: 'public' },
        0,
        10,
        { createdAt: -1 }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Cards in category: JavaScript' })
      );
    });
  });

  describe('cardsByUser', () => {
    it('should return cards for a specific user', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, {
        userId: '60263f14648fed5246e322d9',
        page: '1'
      }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardService, 'getCards').mockResolvedValue([cardMockData]);

      await GetCards.prototype.cardsByUser(req, res);
      expect(flashcardService.getCards).toHaveBeenCalledWith(
        { userId: '60263f14648fed5246e322d9' },
        0,
        10,
        { createdAt: -1 }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User cards' }));
    });
  });

  describe('singleCard', () => {
    it('should return a single card by id', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardService, 'getCards').mockResolvedValue([cardMockData]);

      await GetCards.prototype.singleCard(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Card details', card: cardMockData })
      );
    });

    it('should return null card when not found', async () => {
      const req: Request = flashcardMockRequest({}, authUserPayload, { cardId: '6027f77087c9d9ccb1555268' }) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardService, 'getCards').mockResolvedValue([]);

      await GetCards.prototype.singleCard(req, res);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ card: null }));
    });
  });
});
