import { FlashcardCache } from '@service/redis/flashcard.cache';
import { cardMockData } from '@root/mocks/flashcard.mock';
import { authUserPayload } from '@root/mocks/auth.mock';

jest.mock('@service/redis/base.cache');

const CARD_KEY = '6027f77087c9d9ccb1555268';
const USER_ID = authUserPayload.userId;

// Shared mock client that all tests use
const mockMulti = {
  ZADD: jest.fn(),
  HSET: jest.fn(),
  ZREM: jest.fn(),
  DEL: jest.fn(),
  HGETALL: jest.fn(),
  exec: jest.fn().mockResolvedValue([])
};

const mockClient = {
  isOpen: true,
  connect: jest.fn(),
  HMGET: jest.fn(),
  HGET: jest.fn(),
  HSET: jest.fn(),
  ZRANGE: jest.fn(),
  multi: jest.fn().mockReturnValue(mockMulti)
};

describe('FlashcardCache', () => {
  let flashcardCache: FlashcardCache;

  beforeEach(() => {
    flashcardCache = new FlashcardCache();
    (flashcardCache as any).client = mockClient;
    jest.clearAllMocks();
    mockClient.multi.mockReturnValue(mockMulti);
    mockMulti.exec.mockResolvedValue([]);
  });

  describe('saveCardToCache', () => {
    it('should save card to cache with ZADD and HSET commands', async () => {
      mockClient.HMGET.mockResolvedValue(['5']);

      await flashcardCache.saveCardToCache({
        key: CARD_KEY,
        currentUserId: USER_ID,
        uId: '1621613119252066',
        createdCard: cardMockData
      });

      expect(mockClient.HMGET).toHaveBeenCalledWith(`user:${USER_ID}`, 'cardsCount');
      expect(mockMulti.ZADD).toHaveBeenCalledWith(
        'flashcard',
        { score: 1621613119252066, value: CARD_KEY }
      );
    });

    it('should throw ServerError on client error', async () => {
      mockClient.HMGET.mockRejectedValue(new Error('Redis error'));

      await expect(
        flashcardCache.saveCardToCache({
          key: CARD_KEY,
          currentUserId: USER_ID,
          uId: '1621613119252066',
          createdCard: cardMockData
        })
      ).rejects.toThrow('Server error. Try again.');
    });
  });

  describe('getCardsFromCache', () => {
    it('should return parsed card list from cache', async () => {
      mockClient.ZRANGE.mockResolvedValue([CARD_KEY]);
      mockMulti.exec.mockResolvedValue([
        {
          ...cardMockData,
          commentsCount: '0',
          likesCount: '0',
          bookmarksCount: '0',
          studyCount: '0',
          createdAt: new Date().toString()
        }
      ]);

      const result = await flashcardCache.getCardsFromCache('flashcard', 0, 10);
      expect(result).toHaveLength(1);
      expect(result[0].commentsCount).toEqual(0);
      expect(result[0].likesCount).toEqual(0);
    });

    it('should throw ServerError on client error', async () => {
      mockClient.ZRANGE.mockRejectedValue(new Error('Redis error'));

      await expect(flashcardCache.getCardsFromCache('flashcard', 0, 10)).rejects.toThrow(
        'Server error. Try again.'
      );
    });
  });

  describe('deleteCardFromCache', () => {
    it('should remove card from sorted set and delete hash', async () => {
      mockClient.HMGET.mockResolvedValue(['5']);

      await flashcardCache.deleteCardFromCache(CARD_KEY, USER_ID);
      expect(mockMulti.ZREM).toHaveBeenCalledWith('flashcard', CARD_KEY);
      expect(mockMulti.DEL).toHaveBeenCalledWith(`flashcards:${CARD_KEY}`);
    });

    it('should not set negative cardsCount', async () => {
      mockClient.HMGET.mockResolvedValue(['0']);

      await flashcardCache.deleteCardFromCache(CARD_KEY, USER_ID);
      expect(mockMulti.HSET).toHaveBeenCalledWith(`user:${USER_ID}`, 'cardsCount', 0);
    });
  });

  describe('updateCardCounter', () => {
    it('should increment field value in cache', async () => {
      mockClient.HGET.mockResolvedValue('3');

      await flashcardCache.updateCardCounter(CARD_KEY, 'likesCount', 1);
      expect(mockClient.HSET).toHaveBeenCalledWith(`flashcards:${CARD_KEY}`, 'likesCount', 4);
    });

    it('should not set negative counter values', async () => {
      mockClient.HGET.mockResolvedValue('0');

      await flashcardCache.updateCardCounter(CARD_KEY, 'likesCount', -1);
      expect(mockClient.HSET).toHaveBeenCalledWith(`flashcards:${CARD_KEY}`, 'likesCount', 0);
    });

    it('should handle null HGET (treat as 0)', async () => {
      mockClient.HGET.mockResolvedValue(null);

      await flashcardCache.updateCardCounter(CARD_KEY, 'commentsCount', 1);
      expect(mockClient.HSET).toHaveBeenCalledWith(`flashcards:${CARD_KEY}`, 'commentsCount', 1);
    });
  });
});
