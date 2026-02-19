import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

export interface ICardProgressDocument extends Document {
  _id: string | mongoose.Types.ObjectId;
  userId: string | mongoose.Types.ObjectId;
  cardId: string | mongoose.Types.ObjectId;
  masteryLevel: number;
  timesStudied: number;
  lastStudiedAt?: Date;
  nextReviewDate?: Date;
  correctCount: number;
  incorrectCount: number;
  confidenceLevel: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUpdateProgressData {
  cardId: string;
  userId: string;
  difficulty: 'again' | 'hard' | 'good' | 'easy';
}

export interface IProgressStats {
  totalCards: number;
  studiedCards: number;
  masteredCards: number;
  cardsToReview: number;
  currentStreak: number;
}
