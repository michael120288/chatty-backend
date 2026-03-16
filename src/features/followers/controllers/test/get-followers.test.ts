/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Get } from '@follower/controllers/get-followers';
import { authMockRequest, authMockResponse, authUserPayload } from '@root/mocks/auth.mock';
import { FollowerCache } from '@service/redis/follower.cache';
import { followerService } from '@service/db/follower.service';

jest.mock('@service/redis/follower.cache');
jest.mock('@service/db/follower.service');
jest.mock('@service/queues/base.queue');

const FOLLOWING = [{ _id: 'u2', username: 'Bob' }] as any[];
const FOLLOWERS = [{ _id: 'u3', username: 'Carol' }] as any[];

describe('Get Followers', () => {
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();
    res = authMockResponse();
  });

  describe('userFollowing', () => {
    it('returns cached following list when cache is populated', async () => {
      (FollowerCache.prototype.getFollowersFromCache as jest.Mock).mockResolvedValueOnce(FOLLOWING);
      const req = authMockRequest({}, {}, authUserPayload) as unknown as Request;

      await Get.prototype.userFollowing(req, res);

      expect(followerService.getFolloweeData).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User following', following: FOLLOWING });
    });

    it('falls back to DB when cache is empty', async () => {
      (FollowerCache.prototype.getFollowersFromCache as jest.Mock).mockResolvedValueOnce([]);
      (followerService.getFolloweeData as jest.Mock).mockResolvedValueOnce(FOLLOWING);
      const req = authMockRequest({}, {}, authUserPayload) as unknown as Request;

      await Get.prototype.userFollowing(req, res);

      expect(followerService.getFolloweeData).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: 'User following', following: FOLLOWING });
    });
  });

  describe('userFollowers', () => {
    it('returns cached followers list when cache is populated', async () => {
      (FollowerCache.prototype.getFollowersFromCache as jest.Mock).mockResolvedValueOnce(FOLLOWERS);
      const req = authMockRequest({}, {}, authUserPayload, { userId: '60263f14648fed5246e322d9' }) as unknown as Request;

      await Get.prototype.userFollowers(req, res);

      expect(followerService.getFollowerData).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User followers', followers: FOLLOWERS });
    });

    it('falls back to DB when cache is empty', async () => {
      (FollowerCache.prototype.getFollowersFromCache as jest.Mock).mockResolvedValueOnce([]);
      (followerService.getFollowerData as jest.Mock).mockResolvedValueOnce(FOLLOWERS);
      const req = authMockRequest({}, {}, authUserPayload, { userId: '60263f14648fed5246e322d9' }) as unknown as Request;

      await Get.prototype.userFollowers(req, res);

      expect(followerService.getFollowerData).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: 'User followers', followers: FOLLOWERS });
    });
  });
});
