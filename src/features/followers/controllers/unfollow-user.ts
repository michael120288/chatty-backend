import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { FollowerCache } from '@service/redis/follower.cache';
import { followerQueue } from '@service/queues/follower.queue';

const followerCache: FollowerCache = new FollowerCache();

export class Remove {
  public async follower(req: Request, res: Response): Promise<void> {
    const { followeeId, followerId } = req.params;

    // Idempotency: only unfollow if actually following, so counts can't drift
    // negative on a duplicate/spurious unfollow request.
    const isFollowing: boolean = await followerCache.isFollowingInCache(
      `following:${req.currentUser!.userId}`,
      followeeId
    );
    if (!isFollowing) {
      res.status(HTTP_STATUS.OK).json({ message: 'Unfollowed user now' });
      return;
    }

    const removeFollowerFromCache: Promise<void> = followerCache.removeFollowerFromCache(
      `following:${req.currentUser!.userId}`,
      followeeId
    );
    const removeFolloweeFromCache: Promise<void> = followerCache.removeFollowerFromCache(`followers:${followeeId}`, followerId);

    const followersCount: Promise<void> = followerCache.updateFollowersCountInCache(`${followeeId}`, 'followersCount', -1);
    const followeeCount: Promise<void> = followerCache.updateFollowersCountInCache(`${followerId}`, 'followingCount', -1);
    await Promise.all([removeFollowerFromCache, removeFolloweeFromCache, followersCount, followeeCount]);

    followerQueue.addFollowerJob('removeFollowerFromDB', {
      keyOne: `${followeeId}`,
      keyTwo: `${followerId}`
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Unfollowed user now' });
  }
}