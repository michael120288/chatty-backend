/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostCache } from '@service/redis/post.cache';
import { postMockData } from '@root/mocks/post.mock';
import { authUserPayload } from '@root/mocks/auth.mock';

jest.mock('@service/redis/base.cache');

const POST_KEY = '6027f77087c9d9ccb1555268';
const USER_ID = authUserPayload.userId;

const mockMulti = {
  ZADD: jest.fn(),
  HSET: jest.fn(),
  ZREM: jest.fn(),
  DEL: jest.fn(),
  HGETALL: jest.fn(),
  exec: jest.fn().mockResolvedValue([])
};

const mockClient = {
  isOpen: true,
  connect: jest.fn(),
  HMGET: jest.fn(),
  ZRANGE: jest.fn(),
  ZCARD: jest.fn(),
  ZCOUNT: jest.fn(),
  HSET: jest.fn(),
  multi: jest.fn().mockReturnValue(mockMulti)
};

describe('PostCache', () => {
  let postCache: PostCache;

  beforeEach(() => {
    postCache = new PostCache();
    (postCache as any).client = mockClient;
    jest.clearAllMocks();
    mockClient.multi.mockReturnValue(mockMulti);
    mockMulti.exec.mockResolvedValue([]);
  });

  describe('savePostToCache', () => {
    it('should save post to cache with ZADD and HSET commands', async () => {
      mockClient.HMGET.mockResolvedValue(['5']);

      await postCache.savePostToCache({
        key: POST_KEY,
        currentUserId: USER_ID,
        uId: '1621613119252066',
        createdPost: postMockData
      });

      expect(mockClient.HMGET).toHaveBeenCalledWith(`user:${USER_ID}`, 'postsCount');
      expect(mockMulti.ZADD).toHaveBeenCalledWith(
        'post',
        { score: 1621613119252066, value: POST_KEY }
      );
    });

    it('should throw ServerError on client error', async () => {
      mockClient.HMGET.mockRejectedValue(new Error('Redis error'));

      await expect(
        postCache.savePostToCache({
          key: POST_KEY,
          currentUserId: USER_ID,
          uId: '1621613119252066',
          createdPost: postMockData
        })
      ).rejects.toThrow('Server error. Try again.');
    });
  });

  describe('getPostsFromCache', () => {
    it('should return parsed posts from cache', async () => {
      mockClient.ZRANGE.mockResolvedValue([POST_KEY]);
      mockMulti.exec.mockResolvedValue([
        {
          ...postMockData,
          commentsCount: '0',
          reactions: JSON.stringify(postMockData.reactions),
          createdAt: new Date().toString()
        }
      ]);

      const result = await postCache.getPostsFromCache('post', 0, 10);
      expect(result).toHaveLength(1);
      expect(result[0].commentsCount).toEqual(0);
      expect(result[0].reactions).toEqual(postMockData.reactions);
    });

    it('should throw ServerError on client error', async () => {
      mockClient.ZRANGE.mockRejectedValue(new Error('Redis error'));

      await expect(postCache.getPostsFromCache('post', 0, 10)).rejects.toThrow(
        'Server error. Try again.'
      );
    });
  });

  describe('getTotalPostsInCache', () => {
    it('should return total post count', async () => {
      mockClient.ZCARD.mockResolvedValue(15);

      const count = await postCache.getTotalPostsInCache();
      expect(count).toEqual(15);
    });
  });

  describe('getTotalUserPostsInCache', () => {
    it('should count posts by user uId score', async () => {
      mockClient.ZCOUNT.mockResolvedValue(3);

      const count = await postCache.getTotalUserPostsInCache(1621613119252066);
      expect(count).toEqual(3);
      expect(mockClient.ZCOUNT).toHaveBeenCalledWith('post', 1621613119252066, 1621613119252066);
    });
  });

  describe('deletePostFromCache', () => {
    it('should remove post from sorted set and delete related keys', async () => {
      mockClient.HMGET.mockResolvedValue(['5']);

      await postCache.deletePostFromCache(POST_KEY, USER_ID);
      expect(mockMulti.ZREM).toHaveBeenCalledWith('post', POST_KEY);
      expect(mockMulti.DEL).toHaveBeenCalledWith(`posts:${POST_KEY}`);
      expect(mockMulti.DEL).toHaveBeenCalledWith(`comments:${POST_KEY}`);
      expect(mockMulti.DEL).toHaveBeenCalledWith(`reactions:${POST_KEY}`);
    });
  });

  describe('updatePostInCache', () => {
    it('should update post fields and return updated post', async () => {
      const updatedPost = { ...postMockData, post: 'Updated content' } as typeof postMockData;
      mockClient.HSET.mockResolvedValue(1);
      mockMulti.exec.mockResolvedValue([
        {
          ...updatedPost,
          commentsCount: '0',
          reactions: JSON.stringify(postMockData.reactions),
          createdAt: new Date().toString()
        }
      ]);

      const result = await postCache.updatePostInCache(POST_KEY, updatedPost);
      expect(mockClient.HSET).toHaveBeenCalled();
      expect(result.commentsCount).toEqual(0);
    });

    it('should throw ServerError on client error', async () => {
      mockClient.HSET.mockRejectedValue(new Error('Redis error'));

      await expect(postCache.updatePostInCache(POST_KEY, postMockData)).rejects.toThrow(
        'Server error. Try again.'
      );
    });
  });
});
