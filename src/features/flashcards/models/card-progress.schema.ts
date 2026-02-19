import mongoose, { model, Model, Schema } from 'mongoose';
import { ICardProgressDocument } from '@flashcards/interfaces/card-progress.interface';

const cardProgressSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard', index: true, required: true },
  masteryLevel: { type: Number, default: 0, min: 0, max: 5 },
  timesStudied: { type: Number, default: 0 },
  lastStudiedAt: { type: Date, default: null },
  nextReviewDate: { type: Date, default: null },
  correctCount: { type: Number, default: 0 },
  incorrectCount: { type: Number, default: 0 },
  confidenceLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound unique index to ensure one progress record per user per card
cardProgressSchema.index({ userId: 1, cardId: 1 }, { unique: true });

const CardProgressModel: Model<ICardProgressDocument> = model<ICardProgressDocument>(
  'CardProgress',
  cardProgressSchema,
  'CardProgress'
);

export { CardProgressModel };
