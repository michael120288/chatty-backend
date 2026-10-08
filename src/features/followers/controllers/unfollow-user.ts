import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { FollowerCache } from '@service/redis/follower.cache';
import { UserCache } from '@service/redis/user.cache';
import { userService } from '@service/db/user.service';
import { IUserDocument } from '@user/interfaces/user.interface';
import { IFollowerData } from '@follower/interfaces/follower.interface';
import { buildFollowerUserData } from '@follower/controllers/follower-user';
import { socketIOFollowerObject } from '@socket/follower';
import { followerQueue } from '@service/queues/follower.queue';

const followerCache: FollowerCache = new FollowerCache();
const userCache: UserCache = new UserCache();

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

    // Broadcast fresh post-decrement counts for the unfollowed user, mirroring
    // 'add follower' in follower-user.ts — read cache again rather than
    // computing the new count locally, so this stays correct if anything else
    // concurrently updates it. Falls back to Mongo on a cache miss (a
    // corrupted/partially-expired entry); the unfollow itself is already
    // applied above by this point, so a still-missing user here just skips
    // the broadcast rather than failing the whole request.
    const cachedFollowee: IUserDocument | undefined =
      (await userCache.getUserFromCache(followeeId)) ?? (await userService.getUserById(followeeId));
    if (cachedFollowee) {
      const removeFolloweeData: IFollowerData = buildFollowerUserData(cachedFollowee);
      socketIOFollowerObject.emit('remove follower', removeFolloweeData);
    }

    followerQueue.addFollowerJob('removeFollowerFromDB', {
      keyOne: `${followeeId}`,
      keyTwo: `${followerId}`
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Unfollowed user now' });
  }
}