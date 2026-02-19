import mongoose, { model, Model, Schema } from 'mongoose';
import { IFlashcardDocument } from '@flashcards/interfaces/flashcard.interface';

const flashcardSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  username: { type: String },
  avatarColor: { type: String },
  profilePicture: { type: String },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true, index: true },
  questionImgVersion: { type: String, default: '' },
  questionImgId: { type: String, default: '' },
  answerImgVersion: { type: String, default: '' },
  answerImgId: { type: String, default: '' },
  questionCodeSnippet: { type: String, default: '' },
  answerCodeSnippet: { type: String, default: '' },
  privacy: { type: String, default: 'public' },
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', index: true },
  difficulty: { type: String, default: '' },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  bookmarksCount: { type: Number, default: 0 },
  studyCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const FlashcardModel: Model<IFlashcardDocument> = model<IFlashcardDocument>('Flashcard', flashcardSchema, 'Flashcard');

export { FlashcardModel };
