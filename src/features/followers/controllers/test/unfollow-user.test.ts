import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as followerServer from '@socket/follower';
import { followersMockRequest, followersMockResponse } from '@root/mocks/followers.mock';
import { existingUser } from '@root/mocks/user.mock';
import { followerQueue } from '@service/queues/follower.queue';
import { FollowerCache } from '@service/redis/follower.cache';
import { UserCache } from '@service/redis/user.cache';
import { Remove } from '@follower/controllers/unfollow-user';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/follower.cache');
jest.mock('@service/redis/user.cache');

Object.defineProperties(followerServer, {
  socketIOFollowerObject: {
    value: new Server(),
    writable: true
  }
});

describe('Remove', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue(existingUser);
    // Pre-existing gap: without this, isFollowingInCache() resolves undefined
    // via FollowerCache's automock, so the idempotency guard always short-
    // circuits the whole handler before it does anything.
    jest.spyOn(FollowerCache.prototype, 'isFollowingInCache').mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should send correct json response', async () => {
    const req: Request = followersMockRequest({}, authUserPayload, {
      followerId: '6064861bc25eaa5a5d2f9bf4',
      followeeId: `${existingUser._id}`
    }) as Request;
    const res: Response = followersMockResponse();
    jest.spyOn(FollowerCache.prototype, 'removeFollowerFromCache');
    jest.spyOn(FollowerCache.prototype, 'updateFollowersCountInCache');
    jest.spyOn(followerQueue, 'addFollowerJob');

    await Remove.prototype.follower(req, res);
    expect(FollowerCache.prototype.removeFollowerFromCache).toHaveBeenCalledTimes(2);
    expect(FollowerCache.prototype.removeFollowerFromCache).toHaveBeenCalledWith(
      `following:${req.currentUser!.userId}`,
      req.params.followeeId
    );
    expect(FollowerCache.prototype.removeFollowerFromCache).toHaveBeenCalledWith(
      `followers:${req.params.followeeId}`,
      req.params.followerId
    );
    expect(FollowerCache.prototype.updateFollowersCountInCache).toHaveBeenCalledTimes(2);
    expect(FollowerCache.prototype.updateFollowersCountInCache).toHaveBeenCalledWith(`${req.params.followeeId}`, 'followersCount', -1);
    expect(FollowerCache.prototype.updateFollowersCountInCache).toHaveBeenCalledWith(`${req.params.followerId}`, 'followingCount', -1);
    expect(followerQueue.addFollowerJob).toHaveBeenCalledWith('removeFollowerFromDB', {
      keyOne: `${req.params.followeeId}`,
      keyTwo: `${req.params.followerId}`
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Unfollowed user now'
    });
  });

  it('should broadcast remove follower with freshly-read counts for the followee', async () => {
    const req: Request = followersMockRequest({}, authUserPayload, {
      followerId: '6064861bc25eaa5a5d2f9bf4',
      followeeId: `${existingUser._id}`
    }) as Request;
    const res: Response = followersMockResponse();
    jest.spyOn(followerServer.socketIOFollowerObject, 'emit');

    await Remove.prototype.follower(req, res);
    expect(UserCache.prototype.getUserFromCache).toHaveBeenCalledWith(req.params.followeeId);
    expect(followerServer.socketIOFollowerObject.emit).toHaveBeenCalledWith(
      'remove follower',
      expect.objectContaining({
        username: existingUser.username,
        followersCount: existingUser.followersCount,
        followingCount: existingUser.followingCount
      })
    );
  });
});
