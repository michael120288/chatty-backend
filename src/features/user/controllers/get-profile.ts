import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { FollowerCache } from '@service/redis/follower.cache';
import { PostCache } from '@service/redis/post.cache';
import { UserCache } from '@service/redis/user.cache';
import { IAllUsers, IUserDocument } from '@user/interfaces/user.interface';
import { IFollowerData } from '@follower/interfaces/follower.interface';
import { followerService } from '@service/db/follower.service';
import mongoose from 'mongoose';
import { userService } from '@service/db/user.service';
import { postService } from '@service/db/post.service';
import { IPostDocument } from '@post/interfaces/post.interface';
import { Helpers } from '@global/helpers/helpers';
import { BlockCheck } from '@global/helpers/block-check';

const postCache: PostCache = new PostCache();
const userCache: UserCache = new UserCache();
const followerCache: FollowerCache = new FollowerCache();

const PAGE_SIZE =12

interface IUserAll {
  newSkip: number;
  limit: number;
  skip: number;
  userId: string;
}

export class Get {
  public async all(req: Request, res: Response): Promise<void> {
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    // ZRANGE end index is inclusive → skip + PAGE_SIZE - 1 yields exactly PAGE_SIZE
    // per page (fixes off-by-one). DB path receives PAGE_SIZE as a fixed page size.
    const end: number = skip + PAGE_SIZE - 1;
    const allUsers = await Get.prototype.allUsers({
      newSkip: skip,
      limit: end,
      skip,
      userId: `${req.currentUser!.userId}`,
    });
    const followers: IFollowerData[] = await Get.prototype.followers(
      `${req.currentUser!.userId}`,
    );
    res
      .status(HTTP_STATUS.OK)
      .json({
        message: 'Get users',
        users: allUsers.users,
        totalUsers: allUsers.totalUsers,
        followers,
      });
  }

  public async profile(req: Request, res: Response): Promise<void> {
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(`${req.currentUser!.userId}`)) as IUserDocument;
    const existingUser: IUserDocument = cachedUser ? cachedUser : await userService.getUserById(`${req.currentUser!.userId}`);
    res.status(HTTP_STATUS.OK).json({ message: 'Get user profile', user: existingUser });
  }

  public async profileByUserId(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(userId)) as IUserDocument;
    const existingUser: IUserDocument = cachedUser ? cachedUser : await userService.getUserById(userId);
    res.status(HTTP_STATUS.OK).json({ message: 'Get user profile by id', user: existingUser });
  }
  private async allUsers({ newSkip, limit, skip, userId }: IUserAll): Promise<IAllUsers> {
    // Decide the data source ONCE per request, based on whether the Redis
    // cache holds the complete user set — not on whether this specific page's
    // slice happens to be non-empty. A partially-warmed cache has a different
    // relative ordering than Mongo's collection; serving page 1 from a partial
    // cache and page 2 from Mongo (or vice versa) mixes two different orderings
    // over the same logical list, which duplicates or skips rows across pages.
    const [cachedTotal, dbTotal] = await Promise.all([userCache.getTotalUsersInCache(), userService.getTotalUsersInDB()]);
    let users: IUserDocument[];
    let type: string;
    if (cachedTotal > 0 && cachedTotal === dbTotal) {
      type = 'redis';
      users = (await userCache.getUsersFromCache(newSkip, limit, userId)) as IUserDocument[];
    } else {
      type = 'mongodb';
      // Fixed page size for the DB path (the `limit` param here is the cache's
      // inclusive ZRANGE end, not a Mongo $limit).
      users = await userService.getAllUsers(userId, skip, PAGE_SIZE);
    }
    const totalUsers: number = type === 'redis' ? cachedTotal : dbTotal;
    return { users, totalUsers };
  }
  private async followers(userId: string): Promise<IFollowerData[]> {
    const cachedFollowers: IFollowerData[] = await followerCache.getFollowersFromCache(`followers:${userId}`);
    const result = cachedFollowers.length ? cachedFollowers : await followerService.getFollowerData(new mongoose.Types.ObjectId(userId));
    return result;
  }

  public async randomUserSuggestions(req: Request, res: Response): Promise<void> {
    let randomUsers: IUserDocument[] = [];
    const cachedUsers: IUserDocument[] = await userCache.getRandomUsersFromCache(`${req.currentUser!.userId}`, req.currentUser!.username);
    if(cachedUsers.length) {
      randomUsers = [...cachedUsers];
    } else {
      const users: IUserDocument[] = await userService.getRandomUsers(req.currentUser!.userId);
      randomUsers = [...users];
    }
    res.status(HTTP_STATUS.OK).json({ message: 'User suggestions', users: randomUsers });
  }

  public async profileAndPosts(req: Request, res: Response): Promise<void> {
    const { userId, username, uId } = req.params;
    const userName: string = Helpers.firstLetterUppercase(username);
    const currentUserId = `${req.currentUser!.userId}`;
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(userId)) as IUserDocument;
    const cachedUserPosts: IPostDocument[] = await postCache.getUserPostsFromCache('post', parseInt(uId, 10));
    const viewer: IUserDocument = (await userCache.getUserFromCache(currentUserId)) as IUserDocument;

    const existingUser: IUserDocument = cachedUser ? cachedUser : await userService.getUserById(userId);
    const allUserPosts: IPostDocument[] = cachedUserPosts.length
      ? cachedUserPosts
      : await postService.getPosts({ username: userName }, 0, 100, { createdAt: -1 });

    // A block relationship (either direction) hides all of this profile's posts.
    // Otherwise, Private posts are only visible to their own owner — same rule
    // enforced on the main feed in get-posts.ts.
    const userPosts: IPostDocument[] = BlockCheck.isBlockedRelationship(viewer, userId)
      ? []
      : allUserPosts.filter((post) => post.privacy !== 'Private' || post.userId === currentUserId);

    res.status(HTTP_STATUS.OK).json({ message: 'Get user profile and posts', user: existingUser, posts: userPosts, totalPosts: userPosts.length });
  }
}
