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
  HGETALL: jest.fn(),
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
      mockMulti.exec.mockResolvedValue([fullUserReply(), fullUserReply({ _id: '60263f14648fed5246e322da' })]);

      const result = await userCache.getUsersFromCache(0, 1, 'excluded');
      expect(result).toHaveLength(2);
      expect(result[0]._id).toBe('60263f14648fed5246e322d9');
    });

    it('drops an entry whose _id is not a valid ObjectId (a corrupted or partially-expired hash)', async () => {
      mockClient.ZRANGE.mockResolvedValue(['userA', 'userB']);
      mockMulti.exec.mockResolvedValue([fullUserReply(), fullUserReply({ _id: 'undefined' })]);

      const result = await userCache.getUsersFromCache(0, 1, 'excluded');
      expect(result).toHaveLength(1);
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

  describe('getUserFromCache', () => {
    it('returns null when the hash does not exist', async () => {
      mockClient.HGETALL.mockResolvedValue({});

      const result = await userCache.getUserFromCache('someId');
      expect(result).toBeNull();
    });

    it('returns null when the hash is missing _id (a corrupted or partially-expired entry)', async () => {
      // Regression guard: this used to be returned as a "user" whose fields
      // (and _id, via new mongoose.Types.ObjectId(undefined)) were silently
      // fabricated by downstream code instead of the read failing closed.
      mockClient.HGETALL.mockResolvedValue({ username: 'Manny' });

      const result = await userCache.getUserFromCache('someId');
      expect(result).toBeNull();
    });

    it('returns null when _id is present but not a valid ObjectId', async () => {
      mockClient.HGETALL.mockResolvedValue(fullUserReply({ _id: 'undefined' }));

      const result = await userCache.getUserFromCache('someId');
      expect(result).toBeNull();
    });

    it('normalizes missing numeric/array/object fields to safe defaults instead of the string "undefined"', async () => {
      // Simulates a hash that has _id but is missing several other fields —
      // e.g. an older/partially-written entry. Helpers.parseJson(`${undefined}`)
      // used to hand back the literal string "undefined" for each of these.
      const { followersCount, followingCount, postsCount, blocked, blockedBy, notifications, social, ...partial } =
        fullUserReply();

      mockClient.HGETALL.mockResolvedValue(partial);

      const result = await userCache.getUserFromCache('someId');
      expect(result?.followersCount).toBe(0);
      expect(result?.followingCount).toBe(0);
      expect(result?.postsCount).toBe(0);
      expect(result?.blocked).toEqual([]);
      expect(result?.blockedBy).toEqual([]);
      expect(result?.notifications).toEqual({ messages: true, reactions: true, comments: true, follows: true });
      expect(result?.social).toEqual({ facebook: '', instagram: '', twitter: '', youtube: '' });
    });

    it('parses well-formed fields normally', async () => {
      mockClient.HGETALL.mockResolvedValue(
        fullUserReply({ followersCount: '3', blocked: '["abc"]', notifications: '{"messages":false}' })
      );

      const result = await userCache.getUserFromCache('someId');
      expect(result?.followersCount).toBe(3);
      expect(result?.blocked).toEqual(['abc']);
      expect(result?.notifications).toEqual({ messages: false });
    });

    it('throws ServerError on client error', async () => {
      mockClient.HGETALL.mockRejectedValue(new Error('Redis error'));

      await expect(userCache.getUserFromCache('someId')).rejects.toThrow('Server error. Try again.');
    });
  });
});
