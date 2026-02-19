import mongoose, { model, Model, Schema } from 'mongoose';
import { ICardReactionDocument } from '@flashcards/interfaces/card-reaction.interface';

const cardReactionSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  username: { type: String, required: true },
  avatarColor: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard', index: true, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound unique index to allow only one reaction per user per card
cardReactionSchema.index({ userId: 1, cardId: 1 }, { unique: true });

const CardReactionModel: Model<ICardReactionDocument> = model<ICardReactionDocument>('CardReaction', cardReactionSchema, 'CardReaction');
export { CardReactionModel };
