/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCache } from '@service/redis/user.cache';

jest.mock('@service/redis/base.cache');

const mockMulti = {
  HGETALL: jest.fn(),
  exec: jest.fn().mockResolvedValue([])
};

const mockClient = {
  isOpen: true,
  connect: jest.fn(),
  ZRANGE: jest.fn(),
  multi: jest.fn().mockReturnValue(mockMulti)
};

function fullUserReply(overrides: Record<string, unknown> = {}) {
  return {
    _id: '60263f14648fed5246e322d9',
    uId: '1621613119252066',
    username: 'Manny',
    email: 'manny@me.com',
    avatarColor: 'red',
    createdAt: new Date().toString(),
    postsCount: '0',
    blocked: '[]',
    blockedBy: '[]',
    profilePicture: '',
    followersCount: '0',
    followingCount: '0',
    notifications: '{}',
    social: '{}',
    bgImageId: '',
    bgImageVersion: '',
    ...overrides
  };
}

describe('UserCache', () => {
  let userCache: UserCache;

  beforeEach(() => {
    userCache = new UserCache();
    (userCache as any).client = mockClient;
    jest.clearAllMocks();
    mockClient.multi.mockReturnValue(mockMulti);
    mockMulti.exec.mockResolvedValue([]);
  });

  describe('getUsersFromCache', () => {
    it('returns parsed users when all hashes exist', async () => {
      mockClient.ZRANGE.mockResolvedValue(['userA', 'userB']);
      mockMulti.exec.mockResolvedValue([fullUserReply(), fullUserReply({ _id: 'userB-id' })]);

      const result = await userCache.getUsersFromCache(0, 1, 'excluded');
      expect(result).toHaveLength(2);
      expect(result[0]._id).toBe('60263f14648fed5246e322d9');
    });

    it('drops ghost entries whose hash no longer exists (HGETALL returns {})', async () => {
      // A deleted user (test-cleanup or account deletion) or a TTL-expired
      // inactive user leaves its id in the 'user' ZSET with no backing hash —
      // HGETALL on that key returns {} rather than erroring. Regression guard
      // for the bug where that {} was returned as a fake user with
      // _id: undefined, corrupting GET /user/all/:page pagination.
      mockClient.ZRANGE.mockResolvedValue(['ghost', 'real']);
      mockMulti.exec.mockResolvedValue([{}, fullUserReply()]);

      const result = await userCache.getUsersFromCache(0, 1, 'excluded');
      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe('60263f14648fed5246e322d9');
    });

    it('returns an empty array when every entry on the page is a ghost', async () => {
      mockClient.ZRANGE.mockResolvedValue(['ghost1', 'ghost2']);
      mockMulti.exec.mockResolvedValue([{}, {}]);

      const result = await userCache.getUsersFromCache(0, 1, 'excluded');
      expect(result).toEqual([]);
    });

    it('throws ServerError on client error', async () => {
      mockClient.ZRANGE.mockRejectedValue(new Error('Redis error'));

      await expect(userCache.getUsersFromCache(0, 1, 'excluded')).rejects.toThrow(
        'Server error. Try again.'
      );
    });
  });
});
