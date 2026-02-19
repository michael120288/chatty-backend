import mongoose, { Document } from 'mongoose';

export interface ICardBookmark {
  _id?: string | mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  cardId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

export interface ICardBookmarkDocument extends Document {
  _id: string | mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  cardId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

export interface ICardBookmarkJob {
  userId: string;
  cardId: string;
  type: 'add' | 'remove';
}
