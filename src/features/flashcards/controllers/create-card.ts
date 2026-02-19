import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { cardSchema, cardWithImageSchema } from '@flashcards/schemas/card.schemes';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { IFlashcardDocument } from '@flashcards/interfaces/flashcard.interface';
import { FlashcardCache } from '@service/redis/flashcard.cache';
import { socketIOFlashcardObject } from '@socket/flashcard';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudinary-upload';
import { BadRequestError } from '@global/helpers/error-handler';
import { imageQueue } from '@service/queues/image.queue';

const flashcardCache: FlashcardCache = new FlashcardCache();

export class CreateCard {
  @joiValidation(cardSchema)
  public async card(req: Request, res: Response): Promise<void> {
    const {
      question,
      answer,
      category,
      questionCodeSnippet,
      answerCodeSnippet,
      privacy,
      deckId,
      difficulty,
      profilePicture
    } = req.body;

    const cardObjectId: ObjectId = new ObjectId();
    const createdCard: IFlashcardDocument = {
      _id: cardObjectId,
      userId: req.currentUser!.userId,
      username: req.currentUser!.username,
      avatarColor: req.currentUser!.avatarColor,
      profilePicture,
      question,
      answer,
      category,
      questionCodeSnippet: questionCodeSnippet || '',
      answerCodeSnippet: answerCodeSnippet || '',
      privacy: privacy || 'public',
      deckId: deckId || '',
      difficulty: difficulty || '',
      questionImgVersion: '',
      questionImgId: '',
      answerImgVersion: '',
      answerImgId: '',
      likesCount: 0,
      commentsCount: 0,
      bookmarksCount: 0,
      studyCount: 0,
      createdAt: new Date()
    } as IFlashcardDocument;

    socketIOFlashcardObject.emit('add card', createdCard);
    await flashcardCache.saveCardToCache({
      key: cardObjectId,
      currentUserId: `${req.currentUser!.userId}`,
      uId: `${req.currentUser!.uId}`,
      createdCard
    });
    flashcardQueue.addCardJob('addCardToDB', { key: req.currentUser!.userId, value: createdCard });
    res.status(HTTP_STATUS.CREATED).json({ message: 'Card created successfully' });
  }

  @joiValidation(cardWithImageSchema)
  public async cardWithImage(req: Request, res: Response): Promise<void> {
    const {
      question,
      answer,
      category,
      questionImage,
      answerImage,
      questionCodeSnippet,
      answerCodeSnippet,
      privacy,
      deckId,
      difficulty,
      profilePicture
    } = req.body;

    let questionImgVersion = '';
    let questionImgId = '';
    let answerImgVersion = '';
    let answerImgId = '';

    // Upload question image if provided
    if (questionImage) {
      const questionResult: UploadApiResponse = (await uploads(questionImage)) as UploadApiResponse;
      if (!questionResult?.public_id) {
        throw new BadRequestError(questionResult.message);
      }
      questionImgVersion = questionResult.version.toString();
      questionImgId = questionResult.public_id;
    }

    // Upload answer image if provided
    if (answerImage) {
      const answerResult: UploadApiResponse = (await uploads(answerImage)) as UploadApiResponse;
      if (!answerResult?.public_id) {
        throw new BadRequestError(answerResult.message);
      }
      answerImgVersion = answerResult.version.toString();
      answerImgId = answerResult.public_id;
    }

    const cardObjectId: ObjectId = new ObjectId();
    const createdCard: IFlashcardDocument = {
      _id: cardObjectId,
      userId: req.currentUser!.userId,
      username: req.currentUser!.username,
      avatarColor: req.currentUser!.avatarColor,
      profilePicture,
      question,
      answer,
      category,
      questionCodeSnippet: questionCodeSnippet || '',
      answerCodeSnippet: answerCodeSnippet || '',
      privacy: privacy || 'public',
      deckId: deckId || '',
      difficulty: difficulty || '',
      questionImgVersion,
      questionImgId,
      answerImgVersion,
      answerImgId,
      likesCount: 0,
      commentsCount: 0,
      bookmarksCount: 0,
      studyCount: 0,
      createdAt: new Date()
    } as IFlashcardDocument;

    socketIOFlashcardObject.emit('add card', createdCard);
    await flashcardCache.saveCardToCache({
      key: cardObjectId,
      currentUserId: `${req.currentUser!.userId}`,
      uId: `${req.currentUser!.uId}`,
      createdCard
    });
    flashcardQueue.addCardJob('addCardToDB', { key: req.currentUser!.userId, value: createdCard });

    // Add images to image queue if they exist
    if (questionImage) {
      imageQueue.addImageJob('addImageToDB', {
        key: `${req.currentUser!.userId}`,
        imgId: questionImgId,
        imgVersion: questionImgVersion
      });
    }
    if (answerImage) {
      imageQueue.addImageJob('addImageToDB', {
        key: `${req.currentUser!.userId}`,
        imgId: answerImgId,
        imgVersion: answerImgVersion
      });
    }

    res.status(HTTP_STATUS.CREATED).json({ message: 'Card created with images successfully' });
  }
}
