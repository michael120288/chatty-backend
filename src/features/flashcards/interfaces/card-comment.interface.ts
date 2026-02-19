import mongoose, { Document } from 'mongoose';

export interface ICardComment {
  _id?: string | mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  username: string;
  avatarColor: string;
  profilePicture?: string;
  cardId: mongoose.Types.ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICardCommentDocument extends Document {
  _id: string | mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  username: string;
  avatarColor: string;
  profilePicture?: string;
  cardId: mongoose.Types.ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICardCommentJob {
  cardId: string;
  userId: string;
  username: string;
  comment: string;
  avatarColor: string;
  profilePicture?: string;
}

export interface IQueryComment {
  _id?: string | mongoose.Types.ObjectId;
  cardId?: string | mongoose.Types.ObjectId;
  userId?: string | mongoose.Types.ObjectId;
}

export interface ICardCommentNameList {
  count: number;
  names: string[];
}
