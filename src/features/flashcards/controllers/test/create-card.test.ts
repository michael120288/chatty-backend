/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as flashcardServer from '@socket/flashcard';
import { newCard, flashcardMockRequest, flashcardMockResponse } from '@root/mocks/flashcard.mock';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { CreateCard } from '@flashcards/controllers/create-card';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import { CustomError } from '@global/helpers/error-handler';
import * as cloudinaryUploads from '@global/helpers/cloudinary-upload';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/flashcard.cache');
jest.mock('@global/helpers/cloudinary-upload');

Object.defineProperties(flashcardServer, {
  socketIOFlashcardObject: {
    value: new Server(),
    writable: true
  }
});

describe('CreateCard', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('card', () => {
    it('should send correct json response', async () => {
      const req: Request = flashcardMockRequest(newCard, authUserPayload) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      const spy = jest.spyOn(FlashcardCache.prototype, 'saveCardToCache');
      jest.spyOn(flashcardQueue, 'addCardJob');

      await CreateCard.prototype.card(req, res);
      const createdCard = spy.mock.calls[0][0].createdCard;
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith('add card', createdCard);
      expect(FlashcardCache.prototype.saveCardToCache).toHaveBeenCalledWith({
        key: spy.mock.calls[0][0].key,
        currentUserId: `${req.currentUser?.userId}`,
        uId: `${req.currentUser?.uId}`,
        createdCard
      });
      expect(flashcardQueue.addCardJob).toHaveBeenCalledWith('addCardToDB', { key: req.currentUser?.userId, value: createdCard });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Card created successfully' });
    });
  });

  describe('cardWithImage', () => {
    it('should throw an error if image upload fails', () => {
      const cardWithImg = { ...newCard, questionImage: 'data:image/jpeg;base64,SGVsbG8=' };
      const req: Request = flashcardMockRequest(cardWithImg, authUserPayload) as Request;
      const res: Response = flashcardMockResponse();
      jest
        .spyOn(cloudinaryUploads, 'uploads')
        .mockImplementation((): any => Promise.resolve({ version: '', public_id: '', message: 'Upload error' }));

      CreateCard.prototype.cardWithImage(req, res).catch((error: CustomError) => {
        expect(error.statusCode).toEqual(400);
        expect(error.serializeError().message).toEqual('Upload error');
      });
    });

    it('should send correct json response with images', async () => {
      const cardWithImg = { ...newCard, questionImage: 'data:image/jpeg;base64,SGVsbG8=' };
      const req: Request = flashcardMockRequest(cardWithImg, authUserPayload) as Request;
      const res: Response = flashcardMockResponse();
      jest.spyOn(flashcardServer.socketIOFlashcardObject, 'emit');
      const spy = jest.spyOn(FlashcardCache.prototype, 'saveCardToCache');
      jest.spyOn(flashcardQueue, 'addCardJob');
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any =>
        Promise.resolve({ version: '1234', public_id: '123456' })
      );

      await CreateCard.prototype.cardWithImage(req, res);
      const createdCard = spy.mock.calls[0][0].createdCard;
      expect(flashcardServer.socketIOFlashcardObject.emit).toHaveBeenCalledWith('add card', createdCard);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Card created with images successfully' });
    });
  });
});
