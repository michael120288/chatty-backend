import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { updateCommentSchema } from '@comment/schemes/comment';
import { ICommentDocument } from '@comment/interfaces/comment.interface';
import { CommentCache } from '@service/redis/comment.cache';
import { commentService } from '@service/db/comment.service';
import { commentQueue } from '@service/queues/comment.queue';
import { NotAuthorizedError } from '@global/helpers/error-handler';

const commentCache: CommentCache = new CommentCache();

export class UpdateComment {
  @joiValidation(updateCommentSchema)
  public async comment(req: Request, res: Response): Promise<void> {
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    const cachedComment: ICommentDocument[] = await commentCache.getSingleCommentFromCache(postId, commentId);
    const existingComment: ICommentDocument | undefined = cachedComment.length
      ? cachedComment[0]
      : (await commentService.getPostComments({ _id: new mongoose.Types.ObjectId(commentId) }, { createdAt: -1 }))[0];

    if (!existingComment) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Comment not found' });
      return;
    }
    if (existingComment.username !== req.currentUser!.username) {
      throw new NotAuthorizedError('Not authorized to update this comment');
    }

    if (cachedComment.length) {
      const updated = { ...(cachedComment[0] as ICommentDocument & { toObject?: () => ICommentDocument }).toObject?.() ?? cachedComment[0], comment };
      await commentCache.updateCommentInCache(postId, commentId, JSON.stringify(updated));
    }

    commentQueue.addCommentJob('updateCommentInDB', { commentId, comment, username: req.currentUser!.username });

    res.status(HTTP_STATUS.OK).json({ message: 'Comment updated successfully' });
  }
}
