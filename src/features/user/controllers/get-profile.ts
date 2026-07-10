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
    let users;
    let type = '';
    const cachedUsers: IUserDocument[] = (await userCache.getUsersFromCache(newSkip, limit, userId)) as IUserDocument[];
    if (cachedUsers.length) {
      type = 'redis';
      users = cachedUsers;
    } else {
      type = 'mongodb';
      // Fixed page size for the DB path (the `limit` param here is the cache's
      // inclusive ZRANGE end, not a Mongo $limit).
      users = await userService.getAllUsers(userId, skip, PAGE_SIZE);
    }
    const totalUsers: number = await Get.prototype.usersCount(type);
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
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(userId)) as IUserDocument;
    const cachedUserPosts: IPostDocument[] = await postCache.getUserPostsFromCache('post', parseInt(uId, 10));

    const existingUser: IUserDocument = cachedUser ? cachedUser : await userService.getUserById(userId);
    const userPosts: IPostDocument[] = cachedUserPosts.length
      ? cachedUserPosts
      : await postService.getPosts({ username: userName }, 0, 100, { createdAt: -1 });

    res.status(HTTP_STATUS.OK).json({ message: 'Get user profile and posts', user: existingUser, posts: userPosts, totalPosts: userPosts.length });
  }

  private async usersCount(type: string): Promise<number> {
    const totalUsers: number = type === 'redis' ? await userCache.getTotalUsersInCache() : await userService.getTotalUsersInDB();
    return totalUsers;
  }
}
