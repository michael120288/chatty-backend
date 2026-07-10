import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IPostDocument } from '@post/interfaces/post.interface';
import { PostCache } from '@service/redis/post.cache';
import { postService } from '@service/db/post.service';

const postCache: PostCache = new PostCache();
const PAGE_SIZE = 10;

export class Get {
  public async posts(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const pageNum: number = parseInt(page, 10);
    // Guard invalid page numbers (0, negative, or non-numeric). Without this,
    // a negative/NaN skip or limit reaches Redis/Mongo and crashes with a 500.
    if (isNaN(pageNum) || pageNum < 1) {
      res.status(HTTP_STATUS.OK).json({ message: 'All posts', posts: [], totalPosts: 0 });
      return;
    }
    const skip: number = (pageNum - 1) * PAGE_SIZE;
    // ZRANGE's end index is inclusive, so use skip + PAGE_SIZE - 1 to return
    // exactly PAGE_SIZE items per page (fixes the off-by-one that returned 11 on page 1).
    const end: number = skip + PAGE_SIZE - 1;
    let posts: IPostDocument[] = [];
    let totalPosts = 0;
    const cachedPosts: IPostDocument[] = await postCache.getPostsFromCache('post', skip, end);
    if (cachedPosts.length) {
      posts = cachedPosts;
      totalPosts = await postCache.getTotalPostsInCache();
    } else {
      posts = await postService.getPosts({}, skip, PAGE_SIZE, { createdAt: -1 });
      totalPosts = await postService.postsCount();
    }
    const currentUserId = req.currentUser?.userId;
    const visiblePosts = posts.filter((post) => post.privacy !== 'Private' || post.userId === currentUserId);
    res.status(HTTP_STATUS.OK).json({ message: 'All posts', posts: visiblePosts, totalPosts });
  }

  public async postsWithImages(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const pageNum: number = parseInt(page, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      res.status(HTTP_STATUS.OK).json({ message: 'All posts with images', posts: [] });
      return;
    }
    const skip: number = (pageNum - 1) * PAGE_SIZE;
    const end: number = skip + PAGE_SIZE - 1;
    let posts: IPostDocument[] = [];
    const cachedPosts: IPostDocument[] = await postCache.getPostsWithImagesFromCache('post', skip, end);
    posts = cachedPosts.length ? cachedPosts : await postService.getPosts({ imgId: '$ne', gifUrl: '$ne' }, skip, PAGE_SIZE, { createdAt: -1 });
    const currentUserId = req.currentUser?.userId;
    const visiblePosts = posts.filter((post) => post.privacy !== 'Private' || post.userId === currentUserId);
    res.status(HTTP_STATUS.OK).json({ message: 'All posts with images', posts: visiblePosts });
  }

  public async postsWithVideos(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const pageNum: number = parseInt(page, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      res.status(HTTP_STATUS.OK).json({ message: 'All posts with videos', posts: [] });
      return;
    }
    const skip: number = (pageNum - 1) * PAGE_SIZE;
    const end: number = skip + PAGE_SIZE - 1;
    let posts: IPostDocument[] = [];
    const cachedPosts: IPostDocument[] = await postCache.getPostsWithVideosFromCache('post', skip, end);
    posts = cachedPosts.length ? cachedPosts : await postService.getPosts({ videoId: '$ne' }, skip, PAGE_SIZE, { createdAt: -1 });
    const currentUserId = req.currentUser?.userId;
    const visiblePosts = posts.filter((post) => post.privacy !== 'Private' || post.userId === currentUserId);
    res.status(HTTP_STATUS.OK).json({ message: 'All posts with videos', posts: visiblePosts });
  }
}