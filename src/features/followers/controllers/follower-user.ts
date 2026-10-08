import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { FollowerCache } from '@service/redis/follower.cache';
import { UserCache } from '@service/redis/user.cache';
import { userService } from '@service/db/user.service';
import { IUserDocument } from '@user/interfaces/user.interface';
import { IFollowerData } from '@follower/interfaces/follower.interface';
import mongoose from 'mongoose';
import { socketIOFollowerObject } from '@socket/follower';
import { followerQueue } from '@service/queues/follower.queue';
import { BlockCheck } from '@global/helpers/block-check';
import { ForbiddenError, NotFoundError } from '@global/helpers/error-handler';

const followerCache: FollowerCache = new FollowerCache();
const userCache: UserCache = new UserCache();

// Shared with the 'unfollow user' socket handler (@socket/follower) so both
// 'add follower' and 'remove follower' broadcasts carry freshly-read counts
// from cache rather than whatever a client happened to send.
export function buildFollowerUserData(user: IUserDocument): IFollowerData {
  return {
    _id: new mongoose.Types.ObjectId(user._id),
    username: user.username!,
    avatarColor: user.avatarColor!,
    postCount: user.postsCount,
    followersCount: user.followersCount,
    followingCount: user.followingCount,
    profilePicture: user.profilePicture,
    uId: user.uId!,
    userProfile: user
  };
}

export class Add {
  public async follower(req: Request, res: Response): Promise<void> {
    const { followerId } = req.params;

    // A block relationship (either direction) blocks new follows outright.
    // Cache miss (a corrupted/partially-expired entry, or one never cached) falls
    // back to Mongo — isBlockedRelationship itself tolerates a null/undefined user.
    const currentUser: IUserDocument | undefined =
      (await userCache.getUserFromCache(`${req.currentUser!.userId}`)) ?? (await userService.getUserById(`${req.currentUser!.userId}`));
    if (BlockCheck.isBlockedRelationship(currentUser, `${followerId}`)) {
      throw new ForbiddenError('You cannot follow this user.');
    }

    // Idempotency: if already following, do nothing so counts and the following
    // list can't drift on a duplicate follow request.
    const alreadyFollowing: boolean = await followerCache.isFollowingInCache(
      `following:${req.currentUser!.userId}`,
      `${followerId}`
    );
    if (alreadyFollowing) {
      res.status(HTTP_STATUS.OK).json({ message: 'Following user now' });
      return;
    }

    // update count in cache
    const followersCount: Promise<void> = followerCache.updateFollowersCountInCache(`${followerId}`, 'followersCount', 1);
    const followeeCount: Promise<void> = followerCache.updateFollowersCountInCache(`${req.currentUser!.userId}`, 'followingCount', 1);
    await Promise.all([followersCount, followeeCount]);

    // Cache miss (a corrupted/partially-expired entry, or one never cached) falls
    // back to Mongo — the user must be real (their id came off a rendered list),
    // so a still-missing result here means something is genuinely wrong, not
    // just a cold cache; fail with a clear error instead of crashing on a null
    // deref building addFolloweeData below.
    const cachedFollower: IUserDocument | undefined =
      (await userCache.getUserFromCache(followerId)) ?? (await userService.getUserById(followerId));
    if (!cachedFollower) {
      throw new NotFoundError('User not found');
    }

    const followerObjectId: ObjectId = new ObjectId();
    const addFolloweeData: IFollowerData = buildFollowerUserData(cachedFollower);
    socketIOFollowerObject.emit('add follower', addFolloweeData);

    const addFollowerToCache: Promise<void> = followerCache.saveFollowerToCache(`following:${req.currentUser!.userId}`, `${followerId}`);
    const addFolloweeToCache: Promise<void> = followerCache.saveFollowerToCache(`followers:${followerId}`, `${req.currentUser!.userId}`);
    await Promise.all([addFollowerToCache, addFolloweeToCache]);

    followerQueue.addFollowerJob('addFollowerToDB', {
      keyOne: `${req.currentUser!.userId}`,
      keyTwo: `${followerId}`,
      username: req.currentUser!.username,
      followerDocumentId: followerObjectId
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Following user now' });
  }
}