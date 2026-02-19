import mongoose, { model, Model, Schema } from 'mongoose';
import { IDeckDocument } from '@flashcards/interfaces/flashcard.interface';

const deckSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  username: { type: String },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, required: true, index: true },
  privacy: { type: String, default: 'public' },
  coverImgVersion: { type: String, default: '' },
  coverImgId: { type: String, default: '' },
  cardsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const DeckModel: Model<IDeckDocument> = model<IDeckDocument>('Deck', deckSchema, 'Deck');

export { DeckModel };
