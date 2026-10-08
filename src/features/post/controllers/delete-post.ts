import { Request, Response } from 'express';
import { PostCache } from '@service/redis/post.cache';
import HTTP_STATUS from 'http-status-codes';
import { socketIOPostObject } from '@socket/post';
import { postQueue } from '@service/queues/post.queue';
import { ForbiddenError, NotFoundError } from '@global/helpers/error-handler';
import { postService } from '@service/db/post.service';

const postCache: PostCache = new PostCache();

export class Delete {
  public async post(req: Request, res: Response): Promise<void> {
    const { postId } = req.params;
    const userId = `${req.currentUser!.userId}`;

    // Ownership enforcement (prevents IDOR). Distinguish the two failure modes:
    //   - post does not exist        → 404 Not Found
    //   - post exists but not yours  → 403 Forbidden (authenticated, not permitted)
    const cachedOwnerId = await postCache.getPostOwnerFromCache(postId);
    const ownerId = cachedOwnerId ?? await postService.getPostOwnerFromDB(postId);
    if (!ownerId) {
      throw new NotFoundError(`Post ${postId} not found`);
    }
    if (ownerId !== userId) {
      throw new ForbiddenError('Not authorized to delete this post');
    }

    socketIOPostObject.emit('delete post', postId);
    await postCache.deletePostFromCache(postId, userId);
    postQueue.addPostJob('deletePostFromDB', { keyOne: postId, keyTwo: req.currentUser!.userId });
    res.status(HTTP_STATUS.OK).json({ message: 'Post deleted successfully' });
  }
}