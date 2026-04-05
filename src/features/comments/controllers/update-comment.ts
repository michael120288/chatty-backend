import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { updateCommentSchema } from '@comment/schemes/comment';
import { ICommentDocument } from '@comment/interfaces/comment.interface';
import { CommentCache } from '@service/redis/comment.cache';
import { commentQueue } from '@service/queues/comment.queue';

const commentCache: CommentCache = new CommentCache();

export class UpdateComment {
  @joiValidation(updateCommentSchema)
  public async comment(req: Request, res: Response): Promise<void> {
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    const cachedComment: ICommentDocument[] = await commentCache.getSingleCommentFromCache(postId, commentId);

    if (cachedComment.length) {
      const updated = { ...cachedComment[0].toObject?.() ?? cachedComment[0], comment };
      await commentCache.updateCommentInCache(postId, commentId, JSON.stringify(updated));
    }

    commentQueue.addCommentJob('updateCommentInDB', { commentId, comment });

    res.status(HTTP_STATUS.OK).json({ message: 'Comment updated successfully' });
  }
}
