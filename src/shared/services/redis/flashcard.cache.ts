import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { config } from '@root/config';
import { ServerError } from '@global/helpers/error-handler';
import { IFlashcardDocument, ISaveCardToCache } from '@flashcards/interfaces/flashcard.interface';
import { RedisCommandRawReply } from '@redis/client/dist/lib/commands';

const log: Logger = config.createLogger('flashcardCache');

export type FlashcardCacheMultiType =
  | string
  | number
  | Buffer
  | RedisCommandRawReply[]
  | IFlashcardDocument
  | IFlashcardDocument[];

export class FlashcardCache extends BaseCache {
  constructor() {
    super('flashcard Cache');
  }

  public async saveCardToCache(data: ISaveCardToCache): Promise<void> {
    const { key, currentUserId, uId, createdCard } = data;
    const {
      _id,
      userId,
      username,
      avatarColor,
      profilePicture,
      question,
      answer,
      category,
      questionImgVersion,
      questionImgId,
      answerImgVersion,
      answerImgId,
      questionCodeSnippet,
      answerCodeSnippet,
      privacy,
      deckId,
      difficulty,
      likesCount,
      commentsCount,
      bookmarksCount,
      studyCount,
      createdAt
    } = createdCard;

    const dataToSave = {
      '_id': `${_id}`,
      'userId': `${userId}`,
      'username': `${username}`,
      'avatarColor': `${avatarColor}`,
      'profilePicture': `${profilePicture}`,
      'question': `${question}`,
      'answer': `${answer}`,
      'category': `${category}`,
      'questionImgVersion': `${questionImgVersion}`,
      'questionImgId': `${questionImgId}`,
      'answerImgVersion': `${answerImgVersion}`,
      'answerImgId': `${answerImgId}`,
      'questionCodeSnippet': `${questionCodeSnippet}`,
      'answerCodeSnippet': `${answerCodeSnippet}`,
      'privacy': `${privacy}`,
      'deckId': `${deckId}`,
      'difficulty': `${difficulty}`,
      'likesCount': `${likesCount}`,
      'commentsCount': `${commentsCount}`,
      'bookmarksCount': `${bookmarksCount}`,
      'studyCount': `${studyCount}`,
      'createdAt': `${createdAt}`
    };

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const cardCount: string[] = await this.client.HMGET(`user:${currentUserId}`, 'cardsCount');
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      multi.ZADD('flashcard', { score: parseInt(uId, 10), value: `${key}` });
      for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
        multi.HSET(`flashcards:${key}`, `${itemKey}`, `${itemValue}`);
      }
      const count: number = parseInt(cardCount[0], 10) + 1;
      multi.HSET(`user:${currentUserId}`, 'cardsCount', count);
      multi.exec();
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getCardsFromCache(key: string, start: number, end: number): Promise<IFlashcardDocument[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const reply: string[] = await this.client.ZRANGE(key, start, end, { REV: true });
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      for (const value of reply) {
        multi.HGETALL(`flashcards:${value}`);
      }
      const replies: FlashcardCacheMultiType = (await multi.exec()) as FlashcardCacheMultiType;
      const cardReplies: IFlashcardDocument[] = [];
      for (const card of replies as IFlashcardDocument[]) {
        card.commentsCount = Number(card.commentsCount);
        card.likesCount = Number(card.likesCount);
        card.bookmarksCount = Number(card.bookmarksCount);
        card.studyCount = Number(card.studyCount);
        card.createdAt = new Date(card.createdAt!);
        cardReplies.push(card);
      }
      return cardReplies;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async deleteCardFromCache(key: string, currentUserId: string): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const cardCount: string[] = await this.client.HMGET(`user:${currentUserId}`, 'cardsCount');
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      multi.ZREM('flashcard', `${key}`);
      multi.DEL(`flashcards:${key}`);
      const count: number = parseInt(cardCount[0], 10) - 1;
      multi.HSET(`user:${currentUserId}`, 'cardsCount', count >= 0 ? count : 0);
      await multi.exec();
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async updateCardInCache(key: string, updatedCard: IFlashcardDocument): Promise<IFlashcardDocument> {
    const {
      question,
      answer,
      category,
      questionImgVersion,
      questionImgId,
      answerImgVersion,
      answerImgId,
      questionCodeSnippet,
      answerCodeSnippet,
      privacy,
      difficulty
    } = updatedCard;

    const dataToSave = {
      'question': `${question}`,
      'answer': `${answer}`,
      'category': `${category}`,
      'questionImgVersion': `${questionImgVersion}`,
      'questionImgId': `${questionImgId}`,
      'answerImgVersion': `${answerImgVersion}`,
      'answerImgId': `${answerImgId}`,
      'questionCodeSnippet': `${questionCodeSnippet}`,
      'answerCodeSnippet': `${answerCodeSnippet}`,
      'privacy': `${privacy}`,
      'difficulty': `${difficulty}`
    };

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
        await this.client.HSET(`flashcards:${key}`, `${itemKey}`, `${itemValue}`);
      }

      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      multi.HGETALL(`flashcards:${key}`);
      const reply: FlashcardCacheMultiType = (await multi.exec()) as FlashcardCacheMultiType;
      const cardReply = reply as IFlashcardDocument[];
      cardReply[0].commentsCount = Number(cardReply[0].commentsCount);
      cardReply[0].likesCount = Number(cardReply[0].likesCount);
      cardReply[0].bookmarksCount = Number(cardReply[0].bookmarksCount);
      cardReply[0].studyCount = Number(cardReply[0].studyCount);
      cardReply[0].createdAt = new Date(cardReply[0].createdAt!);

      return cardReply[0];
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async updateCardCounter(key: string, field: string, value: number): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const currentValue: string | null | undefined = await this.client.HGET(`flashcards:${key}`, field);
      const currentCount: number = currentValue ? parseInt(currentValue, 10) : 0;
      const newValue: number = currentCount + value;
      await this.client.HSET(`flashcards:${key}`, field, newValue >= 0 ? newValue : 0);
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
}

export const flashcardCache: FlashcardCache = new FlashcardCache();
