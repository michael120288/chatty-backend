import { IGetCardsQuery, IFlashcardDocument } from '@flashcards/interfaces/flashcard.interface';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { CardBookmarkModel } from '@flashcards/models/card-bookmark.schema';
import { CardReactionModel } from '@flashcards/models/card-reaction.schema';
import { CardCommentModel } from '@flashcards/models/card-comment.schema';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';
import { Query, UpdateQuery } from 'mongoose';
import { ObjectId } from 'mongodb';

class FlashcardService {
  public async addCardToDB(userId: string, createCard: IFlashcardDocument): Promise<void> {
    const card: Promise<IFlashcardDocument> = FlashcardModel.create(createCard);
    const user: UpdateQuery<IUserDocument> = UserModel.updateOne({ _id: userId }, { $inc: { cardsCount: 1 } });
    await Promise.all([card, user]);
  }

  public async getCards(query: IGetCardsQuery, skip = 0, limit = 0, sort: Record<string, 1 | -1>): Promise<IFlashcardDocument[]> {
    const cards: IFlashcardDocument[] = await FlashcardModel.aggregate([
      { $match: query },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit }
    ]);
    return cards;
  }

  public async cardsCount(): Promise<number> {
    const count: number = await FlashcardModel.find({}).countDocuments();
    return count;
  }

  public async deleteCard(cardId: string, userId: string): Promise<void> {
    const deleteCard: Query<any, IFlashcardDocument> = FlashcardModel.deleteOne({ _id: cardId, userId });
    const decrementCardCount: UpdateQuery<IUserDocument> = UserModel.updateOne({ _id: userId }, { $inc: { cardsCount: -1 } });
    await Promise.all([deleteCard, decrementCardCount]);
  }

  public async editCard(cardId: string, updatedCard: IFlashcardDocument): Promise<void> {
    const updateCard: UpdateQuery<IFlashcardDocument> = FlashcardModel.updateOne(
      { _id: cardId },
      { $set: { ...updatedCard, updatedAt: new Date() } }
    );
    await updateCard;
  }

  public async addBookmark(userId: string, cardId: string): Promise<void> {
    await CardBookmarkModel.create({
      userId: new ObjectId(userId),
      cardId: new ObjectId(cardId),
      createdAt: new Date()
    });
  }

  public async removeBookmark(userId: string, cardId: string): Promise<void> {
    await CardBookmarkModel.deleteOne({
      userId: new ObjectId(userId),
      cardId: new ObjectId(cardId)
    });
  }

  public async addReaction(cardId: string, userId: string, username: string, type: string): Promise<void> {
    await CardReactionModel.updateOne(
      {
        userId: new ObjectId(userId),
        cardId: new ObjectId(cardId)
      },
      {
        $set: {
          username,
          type,
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
  }

  public async removeReaction(cardId: string, userId: string, type: string): Promise<void> {
    await CardReactionModel.deleteOne({
      userId: new ObjectId(userId),
      cardId: new ObjectId(cardId),
      type
    });
  }

  public async addComment(
    cardId: string,
    userId: string,
    username: string,
    comment: string,
    avatarColor: string,
    profilePicture?: string
  ): Promise<void> {
    await CardCommentModel.create({
      userId: new ObjectId(userId),
      cardId: new ObjectId(cardId),
      username,
      comment,
      avatarColor,
      profilePicture: profilePicture || '',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  public async deleteComment(cardId: string, userId: string): Promise<void> {
    await CardCommentModel.deleteOne({
      userId: new ObjectId(userId),
      cardId: new ObjectId(cardId)
    });
  }
}

export const flashcardService: FlashcardService = new FlashcardService();
