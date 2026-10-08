import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';
import { ICommentDocument } from '@comment/interfaces/comment.interface';
import { CommentCache } from '@service/redis/comment.cache';
import { commentService } from '@service/db/comment.service';
import { commentQueue } from '@service/queues/comment.queue';
import { NotAuthorizedError } from '@global/helpers/error-handler';

const commentCache: CommentCache = new CommentCache();

export class Delete {
  public async comment(req: Request, res: Response): Promise<void> {
    const { postId, commentId } = req.params;

    const cachedComment: ICommentDocument[] = await commentCache.getSingleCommentFromCache(postId, commentId);
    const existingComment: ICommentDocument | undefined = cachedComment.length
      ? cachedComment[0]
      : (await commentService.getPostComments({ _id: new mongoose.Types.ObjectId(commentId) }, { createdAt: -1 }))[0];

    if (!existingComment) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Comment not found' });
      return;
    }
    if (existingComment.username !== req.currentUser!.username) {
      throw new NotAuthorizedError('Not authorized to delete this comment');
    }

    await commentCache.deleteCommentFromCache(postId, commentId);

    const databaseCommentData = {
      postId,
      commentId,
      username: req.currentUser!.username
    };
    commentQueue.addCommentJob('deleteCommentFromDB', databaseCommentData);
    res.status(HTTP_STATUS.OK).json({ message: 'Comment deleted successfully' });
  }
}
