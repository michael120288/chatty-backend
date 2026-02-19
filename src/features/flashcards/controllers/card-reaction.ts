import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { CardReactionModel } from '@flashcards/models/card-reaction.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { ICardReactionDocument, ICardReactionJob } from '@flashcards/interfaces/card-reaction.interface';
import { flashcardCache } from '@service/redis/flashcard.cache';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { socketIOFlashcardObject } from '@socket/flashcard';

export class CardReaction {
  /**
   * Add a reaction to a card
   */
  public async addReaction(req: Request, res: Response): Promise<void> {
    const { cardId, type, previousReaction } = req.body;
    const { userId, username, avatarColor } = req.currentUser!;

    try {
      // Check if user already reacted
      const existingReaction = await CardReactionModel.findOne({
        userId: new ObjectId(userId),
        cardId: new ObjectId(cardId)
      });

      let reactionData: ICardReactionDocument;

      if (existingReaction) {
        // Update existing reaction
        existingReaction.type = type;
        await existingReaction.save();
        reactionData = existingReaction;
      } else {
        // Create new reaction
        const newReaction = await CardReactionModel.create({
          userId: new ObjectId(userId),
          username,
          avatarColor,
          profilePicture: '',
          cardId: new ObjectId(cardId),
          type,
          createdAt: new Date()
        });
        reactionData = newReaction;

        // Increment likes count on card
        await FlashcardModel.updateOne({ _id: new ObjectId(cardId) }, { $inc: { likesCount: 1 } });

        // Update cache
        await flashcardCache.updateCardCounter(cardId, 'likesCount', 1);
      }

      // Add job to queue
      const reactionJob: ICardReactionJob = {
        cardId,
        userId,
        username,
        type,
        previousReaction
      };
      flashcardQueue.addCardJob('addReactionToDB', reactionJob);

      // Emit socket event
      socketIOFlashcardObject.emit('add card reaction', {
        cardId,
        reaction: reactionData
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Reaction added successfully',
        reaction: reactionData
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error adding reaction',
        error
      });
    }
  }

  /**
   * Remove a reaction from a card
   */
  public async removeReaction(req: Request, res: Response): Promise<void> {
    const { cardId, reactionType } = req.params;
    const userId = req.currentUser!.userId;

    try {
      // Find and delete reaction
      const reaction = await CardReactionModel.findOneAndDelete({
        userId: new ObjectId(userId),
        cardId: new ObjectId(cardId),
        type: reactionType
      });

      if (!reaction) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: 'Reaction not found'
        });
        return;
      }

      // Decrement likes count on card
      await FlashcardModel.updateOne({ _id: new ObjectId(cardId) }, { $inc: { likesCount: -1 } });

      // Update cache
      await flashcardCache.updateCardCounter(cardId, 'likesCount', -1);

      // Add job to queue
      flashcardQueue.addCardJob('removeReactionFromDB', {
        cardId,
        userId,
        username: req.currentUser!.username,
        type: reactionType
      });

      // Emit socket event
      socketIOFlashcardObject.emit('remove card reaction', {
        cardId,
        userId,
        reactionType
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Reaction removed successfully'
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error removing reaction',
        error
      });
    }
  }

  /**
   * Get all reactions for a card
   */
  public async getCardReactions(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    try {
      const reactions = await CardReactionModel.find({ cardId: new ObjectId(cardId) }).sort({ createdAt: -1 });

      res.status(HTTP_STATUS.OK).json({
        message: 'Card reactions fetched successfully',
        reactions
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching reactions',
        error
      });
    }
  }

  /**
   * Get single card reaction by user
   */
  public async getSingleCardReaction(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const userId = req.currentUser!.userId;

    try {
      const reaction = await CardReactionModel.findOne({
        userId: new ObjectId(userId),
        cardId: new ObjectId(cardId)
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Card reaction fetched successfully',
        reaction: reaction || null
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching reaction',
        error
      });
    }
  }

  /**
   * Get reaction count by type for a card
   */
  public async getReactionsByType(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    try {
      const reactions = await CardReactionModel.aggregate([
        { $match: { cardId: new ObjectId(cardId) } },
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]);

      const reactionCounts = reactions.reduce((acc: any, reaction: any) => {
        acc[reaction._id] = reaction.count;
        return acc;
      }, {});

      res.status(HTTP_STATUS.OK).json({
        message: 'Reaction counts fetched successfully',
        reactions: reactionCounts
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching reaction counts',
        error
      });
    }
  }
}
