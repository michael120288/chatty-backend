import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { newPost, postMockData, postMockRequest, postMockResponse } from '@root/mocks/post.mock';
import { existingUser, existingUserTwo } from '@root/mocks/user.mock';
import { PostCache } from '@service/redis/post.cache';
import { UserCache } from '@service/redis/user.cache';
import { Get } from '@post/controllers/get-posts';
import { postService } from '@service/db/post.service';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/post.cache');
jest.mock('@service/redis/user.cache');

describe('Get', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue(existingUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('posts', () => {
    it('should send correct json response if posts exist in cache', async () => {
          const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
          const res: Response = postMockResponse();
          jest.spyOn(PostCache.prototype, 'getPostsFromCache').mockResolvedValue([postMockData]);
          jest.spyOn(PostCache.prototype, 'getTotalPostsInCache').mockResolvedValue(1);

          await Get.prototype.posts(req, res);
          // end = skip + PAGE_SIZE - 1 = 9, so ZRANGE returns exactly 10 items (0-9 inclusive)
          expect(PostCache.prototype.getPostsFromCache).toHaveBeenCalledWith('post', 0, 9);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            message: 'All posts',
            posts: [postMockData],
            totalPosts: 1
          });
        }, 15000); // Timeout set to 5000 milliseconds (5 seconds)

    it('should send correct json response if posts exist in database', async () => {
      const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
      const res: Response = postMockResponse();
      jest.spyOn(PostCache.prototype, 'getPostsFromCache').mockResolvedValue([]);
      jest.spyOn(PostCache.prototype, 'getTotalPostsInCache').mockResolvedValue(0);
      jest.spyOn(postService, 'getPosts').mockResolvedValue([postMockData]);
      jest.spyOn(postService, 'postsCount').mockResolvedValue(1);

      await Get.prototype.posts(req, res);
      expect(postService.getPosts).toHaveBeenCalledWith({}, 0, 10, { createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All posts',
        posts: [postMockData],
        totalPosts: 1
      });
    });

    it('should send empty posts', async () => {
      const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
      const res: Response = postMockResponse();
      jest.spyOn(PostCache.prototype, 'getPostsFromCache').mockResolvedValue([]);
      jest.spyOn(PostCache.prototype, 'getTotalPostsInCache').mockResolvedValue(0);
      jest.spyOn(postService, 'getPosts').mockResolvedValue([]);
      jest.spyOn(postService, 'postsCount').mockResolvedValue(0);

      await Get.prototype.posts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All posts',
        posts: [],
        totalPosts: 0
      });
    });

    it('excludes a Public post from a user in a block relationship with the viewer', async () => {
      const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
      const res: Response = postMockResponse();
      const blockedAuthorPost = { ...postMockData, userId: existingUserTwo._id, privacy: 'Public' } as typeof postMockData;
      jest.spyOn(PostCache.prototype, 'getPostsFromCache').mockResolvedValue([blockedAuthorPost]);
      jest.spyOn(PostCache.prototype, 'getTotalPostsInCache').mockResolvedValue(1);
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        ...existingUser,
        blocked: [existingUserTwo._id]
      } as typeof existingUser);

      await Get.prototype.posts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All posts',
        posts: [],
        totalPosts: 1
      });
    });
  });

  describe('postWithImages', () => {
    it('should send correct json response if posts exist in cache', async () => {
      const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
      const res: Response = postMockResponse();
      jest.spyOn(PostCache.prototype, 'getPostsWithImagesFromCache').mockResolvedValue([postMockData]);

      await Get.prototype.postsWithImages(req, res);
      // end = skip + PAGE_SIZE - 1 = 9, so ZRANGE returns exactly 10 items (0-9 inclusive)
      expect(PostCache.prototype.getPostsWithImagesFromCache).toHaveBeenCalledWith('post', 0, 9);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All posts with images',
        posts: [postMockData]
      });
    });

    it('should send correct json response if posts exist in database', async () => {
      const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
      const res: Response = postMockResponse();
      jest.spyOn(PostCache.prototype, 'getPostsWithImagesFromCache').mockResolvedValue([]);
      jest.spyOn(postService, 'getPosts').mockResolvedValue([postMockData]);

      await Get.prototype.postsWithImages(req, res);
      expect(postService.getPosts).toHaveBeenCalledWith({ imgId: '$ne', gifUrl: '$ne' }, 0, 10, { createdAt: -1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All posts with images',
        posts: [postMockData]
      });
    });

    it('should send empty posts', async () => {
      const req: Request = postMockRequest(newPost, authUserPayload, { page: '1' }) as Request;
      const res: Response = postMockResponse();
      jest.spyOn(PostCache.prototype, 'getPostsWithImagesFromCache').mockResolvedValue([]);
      jest.spyOn(postService, 'getPosts').mockResolvedValue([]);

      await Get.prototype.postsWithImages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'All posts with images',
        posts: []
      });
    });
  });
});
