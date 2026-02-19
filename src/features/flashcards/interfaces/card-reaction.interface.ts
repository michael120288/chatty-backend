import mongoose, { Document } from 'mongoose';

export interface ICardReaction {
  _id?: string | mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  username: string;
  avatarColor: string;
  profilePicture?: string;
  cardId: mongoose.Types.ObjectId;
  type: string; // 'like', 'love', 'insightful', etc.
  createdAt?: Date;
}

export interface ICardReactionDocument extends Document {
  _id: string | mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  username: string;
  avatarColor: string;
  profilePicture?: string;
  cardId: mongoose.Types.ObjectId;
  type: string;
  createdAt?: Date;
}

export interface ICardReactionJob {
  cardId: string;
  userId: string;
  username: string;
  type: string;
  previousReaction?: string;
}

export interface IQueryReaction {
  _id?: string | mongoose.Types.ObjectId;
  cardId?: string | mongoose.Types.ObjectId;
  userId?: string | mongoose.Types.ObjectId;
}
