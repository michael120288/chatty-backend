import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { CommentCache } from '@service/redis/comment.cache';
import { commentQueue } from '@service/queues/comment.queue';

const commentCache: CommentCache = new CommentCache();

export class Delete {
  public async comment(req: Request, res: Response): Promise<void> {
    const { postId, commentId } = req.params;

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
