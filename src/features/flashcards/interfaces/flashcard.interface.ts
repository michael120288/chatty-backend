import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

export interface IFlashcardDocument extends Document {
  _id: string | mongoose.Types.ObjectId;
  userId: string | mongoose.Types.ObjectId;
  username: string;
  avatarColor: string;
  profilePicture: string;
  question: string;
  answer: string;
  category: string;
  questionImgVersion?: string;
  questionImgId?: string;
  answerImgVersion?: string;
  answerImgId?: string;
  questionCodeSnippet?: string;
  answerCodeSnippet?: string;
  privacy: string;
  deckId?: string | mongoose.Types.ObjectId;
  difficulty?: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  studyCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDeckDocument extends Document {
  _id: string | mongoose.Types.ObjectId;
  userId: string | mongoose.Types.ObjectId;
  username: string;
  name: string;
  description?: string;
  category: string;
  privacy: string;
  coverImgVersion?: string;
  coverImgId?: string;
  cardsCount: number;
  likesCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetCardsQuery {
  _id?: ObjectId | string;
  userId?: ObjectId | string;
  category?: string;
  deckId?: ObjectId | string;
  privacy?: string;
}

export interface IGetDecksQuery {
  _id?: ObjectId | string;
  userId?: ObjectId | string;
  category?: string;
  privacy?: string;
}

export interface ISaveCardToCache {
  key: ObjectId | string;
  currentUserId: string;
  uId: string;
  createdCard: IFlashcardDocument;
}

export interface ISaveDeckToCache {
  key: ObjectId | string;
  currentUserId: string;
  uId: string;
  createdDeck: IDeckDocument;
}

export interface IFlashcardJobData {
  key?: string;
  value?: IFlashcardDocument;
  keyOne?: string;
  keyTwo?: string;
}

export interface IDeckJobData {
  key?: string;
  value?: IDeckDocument;
  keyOne?: string;
  keyTwo?: string;
}
