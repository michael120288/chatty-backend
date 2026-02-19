import mongoose, { model, Model, Schema } from 'mongoose';
import { ICardBookmarkDocument } from '@flashcards/interfaces/card-bookmark.interface';

const cardBookmarkSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard', index: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound unique index to prevent duplicate bookmarks
cardBookmarkSchema.index({ userId: 1, cardId: 1 }, { unique: true });

const CardBookmarkModel: Model<ICardBookmarkDocument> = model<ICardBookmarkDocument>('CardBookmark', cardBookmarkSchema, 'CardBookmark');
export { CardBookmarkModel };
