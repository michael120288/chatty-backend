import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { CardBookmarkModel } from '@flashcards/models/card-bookmark.schema';
import { FlashcardModel } from '@flashcards/models/flashcard.schema';
import { flashcardCache } from '@service/redis/flashcard.cache';
import { flashcardQueue } from '@service/queues/flashcard.queue';
import { socketIOFlashcardObject } from '@socket/flashcard';

export class CardBookmark {
  /**
   * Toggle bookmark on a card (add or remove)
   */
  public async toggleBookmark(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const userId = req.currentUser!.userId;

    try {
      // Check if bookmark already exists
      const existingBookmark = await CardBookmarkModel.findOne({
        userId: new ObjectId(userId),
        cardId: new ObjectId(cardId)
      });

      if (existingBookmark) {
        // Remove bookmark
        await CardBookmarkModel.deleteOne({ _id: existingBookmark._id });

        // Decrement bookmark count on card
        await FlashcardModel.updateOne(
          { _id: new ObjectId(cardId) },
          { $inc: { bookmarksCount: -1 } }
        );

        // Update cache
        await flashcardCache.updateCardCounter(cardId, 'bookmarksCount', -1);

        // Add job to queue for cleanup
        flashcardQueue.addCardJob('removeBookmarkFromDB', {
          userId,
          cardId,
          type: 'remove'
        });

        // Emit socket event
        socketIOFlashcardObject.emit('unbookmark card', { cardId, userId });

        res.status(HTTP_STATUS.OK).json({
          message: 'Bookmark removed successfully',
          bookmarked: false
        });
      } else {
        // Add bookmark
        const newBookmark = await CardBookmarkModel.create({
          userId: new ObjectId(userId),
          cardId: new ObjectId(cardId),
          createdAt: new Date()
        });

        // Increment bookmark count on card
        await FlashcardModel.updateOne(
          { _id: new ObjectId(cardId) },
          { $inc: { bookmarksCount: 1 } }
        );

        // Update cache
        await flashcardCache.updateCardCounter(cardId, 'bookmarksCount', 1);

        // Add job to queue
        flashcardQueue.addCardJob('addBookmarkToDB', {
          userId,
          cardId,
          type: 'add'
        });

        // Emit socket event
        socketIOFlashcardObject.emit('bookmark card', {
          cardId,
          userId,
          bookmarkId: newBookmark._id
        });

        res.status(HTTP_STATUS.CREATED).json({
          message: 'Bookmark added successfully',
          bookmarked: true,
          bookmarkId: newBookmark._id
        });
      }
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error toggling bookmark',
        error
      });
    }
  }

  /**
   * Get all bookmarked cards for a user (paginated)
   */
  public async getBookmarkedCards(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { page = '1' } = req.query;
    const PAGE_SIZE = 10;
    const skip = (parseInt(page as string) - 1) * PAGE_SIZE;

    try {
      // Get bookmarks with card details
      const bookmarks = await CardBookmarkModel.find({ userId: new ObjectId(userId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .populate({
          path: 'cardId',
          model: 'Flashcard',
          select: '-__v'
        });

      // Get total count for pagination
      const totalBookmarks = await CardBookmarkModel.countDocuments({
        userId: new ObjectId(userId)
      });

      res.status(HTTP_STATUS.OK).json({
        message: 'Bookmarked cards fetched successfully',
        bookmarks: bookmarks.map((bookmark: any) => ({
          bookmarkId: bookmark._id,
          bookmarkedAt: bookmark.createdAt,
          card: bookmark.cardId
        })),
        currentPage: parseInt(page as string),
        totalPages: Math.ceil(totalBookmarks / PAGE_SIZE),
        totalBookmarks
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching bookmarked cards',
        error
      });
    }
  }

  /**
   * Check if a card is bookmarked by user
   */
  public async checkBookmark(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;
    const userId = req.currentUser!.userId;

    try {
      const bookmark = await CardBookmarkModel.findOne({
        userId: new ObjectId(userId),
        cardId: new ObjectId(cardId)
      });

      res.status(HTTP_STATUS.OK).json({
        bookmarked: !!bookmark,
        bookmarkId: bookmark?._id || null
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error checking bookmark status',
        error
      });
    }
  }

  /**
   * Get bookmark count for a card
   */
  public async getBookmarkCount(req: Request, res: Response): Promise<void> {
    const { cardId } = req.params;

    try {
      const count = await CardBookmarkModel.countDocuments({
        cardId: new ObjectId(cardId)
      });

      res.status(HTTP_STATUS.OK).json({
        cardId,
        bookmarkCount: count
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching bookmark count',
        error
      });
    }
  }
}
