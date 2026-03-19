import { AuthPayload } from '@auth/interfaces/auth.interface';
import { Response } from 'express';
import mongoose from 'mongoose';
import { authUserPayload } from '@root/mocks/auth.mock';
import { IFlashcardDocument } from '@flashcards/interfaces/flashcard.interface';

export const flashcardMockRequest = (body: IFlashcardBody, currentUser?: AuthPayload | null, params?: IFlashcardParams) => ({
  body,
  params,
  currentUser,
  query: {}
});

export const flashcardMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

interface IFlashcardParams {
  cardId?: string;
  page?: string;
  category?: string;
  userId?: string;
  commentId?: string;
  reactionType?: string;
}

interface IFlashcardBody {
  question?: string;
  answer?: string;
  category?: string;
  questionCodeSnippet?: string;
  answerCodeSnippet?: string;
  privacy?: string;
  deckId?: string;
  difficulty?: string;
  profilePicture?: string;
  questionImage?: string;
  answerImage?: string;
  cardId?: string;
  type?: string;
  previousReaction?: string;
  comment?: string;
}

export const newCard: IFlashcardBody = {
  question: 'What is JavaScript?',
  answer: 'A dynamic programming language',
  category: 'JavaScript',
  questionCodeSnippet: '',
  answerCodeSnippet: '',
  privacy: 'public',
  deckId: '',
  difficulty: 'easy',
  profilePicture: 'http://place-hold.it/500x500'
};

export const cardMockData: IFlashcardDocument = {
  _id: new mongoose.Types.ObjectId('6027f77087c9d9ccb1555268'),
  userId: authUserPayload.userId,
  username: authUserPayload.username,
  avatarColor: authUserPayload.avatarColor,
  profilePicture: 'http://place-hold.it/500x500',
  question: 'What is JavaScript?',
  answer: 'A dynamic programming language',
  category: 'JavaScript',
  questionImgVersion: '',
  questionImgId: '',
  answerImgVersion: '',
  answerImgId: '',
  questionCodeSnippet: '',
  answerCodeSnippet: '',
  privacy: 'public',
  deckId: '',
  difficulty: 'easy',
  likesCount: 0,
  commentsCount: 0,
  bookmarksCount: 0,
  studyCount: 0,
  createdAt: new Date()
} as unknown as IFlashcardDocument;
