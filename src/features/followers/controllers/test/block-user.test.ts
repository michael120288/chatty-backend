/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AddUser } from '@follower/controllers/block-user';
import { authMockRequest, authMockResponse, authUserPayload } from '@root/mocks/auth.mock';
import { FollowerCache } from '@service/redis/follower.cache';
import { blockedUserQueue } from '@service/queues/blocked.queue';

jest.mock('@service/redis/follower.cache');
jest.mock('@service/queues/base.queue');

describe('Block/Unblock User', () => {
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();
    res = authMockResponse();
    (FollowerCache.prototype.updateBlockedUserPropInCache as jest.Mock).mockResolvedValue(undefined);
  });

  describe('block', () => {
    it('returns 200 with "User blocked" message', async () => {
      const req = authMockRequest({}, {}, authUserPayload, { followerId: 'follower123' }) as unknown as Request;
      jest.spyOn(blockedUserQueue, 'addBlockedUserJob').mockImplementation(() => {});

      await AddUser.prototype.block(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User blocked' });
    });

    it('enqueues addBlockedUserToDB job with block type', async () => {
      const req = authMockRequest({}, {}, authUserPayload, { followerId: 'follower123' }) as unknown as Request;
      const addJobSpy = jest.spyOn(blockedUserQueue, 'addBlockedUserJob').mockImplementation(() => {});

      await AddUser.prototype.block(req, res);

      expect(addJobSpy).toHaveBeenCalledWith('addBlockedUserToDB', expect.objectContaining({ type: 'block' }));
    });
  });

  describe('unblock', () => {
    it('returns 200 with "User unblocked" message', async () => {
      const req = authMockRequest({}, {}, authUserPayload, { followerId: 'follower123' }) as unknown as Request;
      jest.spyOn(blockedUserQueue, 'addBlockedUserJob').mockImplementation(() => {});

      await AddUser.prototype.unblock(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User unblocked' });
    });

    it('enqueues removeBlockedUserFromDB job with unblock type', async () => {
      const req = authMockRequest({}, {}, authUserPayload, { followerId: 'follower123' }) as unknown as Request;
      const addJobSpy = jest.spyOn(blockedUserQueue, 'addBlockedUserJob').mockImplementation(() => {});

      await AddUser.prototype.unblock(req, res);

      expect(addJobSpy).toHaveBeenCalledWith('removeBlockedUserFromDB', expect.objectContaining({ type: 'unblock' }));
    });
  });
});
