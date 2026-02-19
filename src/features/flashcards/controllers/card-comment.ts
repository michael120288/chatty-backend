import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { cardCommentSchema } from '@flashcards/schemas/card.schemes';
import { CardCommentModel } from '@flashcards/models/card-comment.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { ICardCommentDocument, ICardCommentJob } from '@flashcards/interfaces/card-comment.interface';
import { flashcardCache } from '@service/redis/flashcard.cache';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { socketIOFlashcardObject } from '@socket/flashcard';

export class CardComment {
  /**
   * Add a comment to a card
   */
  @joiValidation(cardCommentSchema)
  public async addComment(req: Request, res: Response): Promise<void> {
    const { cardId, comment } = req.body;
    const { userId, username, avatarColor } = req.currentUser!;

    try {
      const commentObjectId: ObjectId = new ObjectId();
      const newComment: ICardCommentDocument = {
        _id: commentObjectId,
        userId: new ObjectId(userId),
        username,
        avatarColor,
        profilePicture: '',
        cardId: new ObjectId(cardId),
        comment,
        createdAt: new Date(),
        updatedAt: new Date()
      } as ICardCommentDocument;

      // Save comment to DB
      await CardCommentModel.create(newComment);

      // Increment comments count on card
      await FlashcardModel.updateOne({ _id: new ObjectId(cardId) }, { $inc: { commentsCount: 1 } });

      // Update cache
      await flashcardCache.updateCardCounter(cardId, 'commentsCount', 1);

      // Add job to queue
      const commentJob: ICardCommentJob = {
        cardId,
        userId,
        username,
        comment,
        avatarColor,
        profilePicture: ''
      };
      flashcardQueue.addCardJob('addCommentToDB', commentJob);

      // Emit socket event
      socketIOFlashcardObject.emit('add card comment', {
        cardId,
        comment: newComment
      });

      res.status(HTTP_STATUS.CREATED).json({
        message: 'Comment added successfully',
        comment: newComment
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error adding comment',
        error
      });
    }
  }

  /**
   * Get all comments for a card (paginated)
   */
  public async getCardComments(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const { page = '1' } = req.query;
    const PAGE_SIZE = 10;
    const skip = (parseInt(page as string) - 1) * PAGE_SIZE;

    try {
      const comments = await CardCommentModel.find({ cardId: new ObjectId(cardId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);

      const totalComments = await CardCommentModel.countDocuments({ cardId: new ObjectId(cardId) });

      res.status(HTTP_STATUS.OK).json({
        message: 'Comments fetched successfully',
        comments,
        currentPage: parseInt(page as string),
        totalPages: Math.ceil(totalComments / PAGE_SIZE),
        totalComments
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching comments',
        error
      });
    }
  }

  /**
   * Delete a comment
   */
  public async deleteComment(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;
    const userId = req.currentUser!.userId;

    try {
      // Find and delete comment (only if user owns it)
      const comment = await CardCommentModel.findOneAndDelete({
        _id: new ObjectId(commentId),
        userId: new ObjectId(userId)
      });

      if (!comment) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: 'Comment not found or you do not have permission to delete it'
        });
        return;
      }

      // Decrement comments count on card
      await FlashcardModel.updateOne({ _id: comment.cardId }, { $inc: { commentsCount: -1 } });

      // Update cache
      await flashcardCache.updateCardCounter(comment.cardId.toString(), 'commentsCount', -1);

      // Add job to queue
      flashcardQueue.addCardJob('deleteCommentFromDB', {
        cardId: comment.cardId.toString(),
        userId,
        username: req.currentUser!.username,
        comment: comment.comment,
        avatarColor: req.currentUser!.avatarColor
      });

      // Emit socket event
      socketIOFlashcardObject.emit('delete card comment', {
        cardId: comment.cardId,
        commentId
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Comment deleted successfully'
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting comment',
        error
      });
    }
  }

  /**
   * Update a comment
   */
  @joiValidation(cardCommentSchema)
  public async updateComment(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;
    const { comment } = req.body;
    const userId = req.currentUser!.userId;

    try {
      // Find and update comment (only if user owns it)
      const updatedComment = await CardCommentModel.findOneAndUpdate(
        {
          _id: new ObjectId(commentId),
          userId: new ObjectId(userId)
        },
        {
          $set: {
            comment,
            updatedAt: new Date()
          }
        },
        { new: true }
      );

      if (!updatedComment) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: 'Comment not found or you do not have permission to update it'
        });
        return;
      }

      // Emit socket event
      socketIOFlashcardObject.emit('update card comment', {
        cardId: updatedComment.cardId,
        comment: updatedComment
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Comment updated successfully',
        comment: updatedComment
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating comment',
        error
      });
    }
  }

  /**
   * Get comment names (list of usernames who commented)
   */
  public async getCommentNames(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    try {
      const comments = await CardCommentModel.find({ cardId: new ObjectId(cardId) })
        .select('username')
        .limit(10);

      const names = comments.map((comment) => comment.username);
      const uniqueNames = [...new Set(names)];

      res.status(HTTP_STATUS.OK).json({
        message: 'Comment names fetched successfully',
        count: uniqueNames.length,
        names: uniqueNames
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching comment names',
        error
      });
    }
  }
}
