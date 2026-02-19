import mongoose, { model, Model, Schema } from 'mongoose';
import { ICardCommentDocument } from '@flashcards/interfaces/card-comment.interface';

const cardCommentSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  username: { type: String, required: true },
  avatarColor: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard', index: true, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const CardCommentModel: Model<ICardCommentDocument> = model<ICardCommentDocument>('CardComment', cardCommentSchema, 'CardComment');
export { CardCommentModel };
