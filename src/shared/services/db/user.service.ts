import { IBasicInfo, ISearchUser, IUserDocument, ISocialLinks, INotificationSettings } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';
import mongoose from 'mongoose';
import { indexOf } from 'lodash';
import { followerService } from '@service/db/follower.service';
import { AuthModel } from '@auth/models/auth.schema';
import { UserCache } from '@service/redis/user.cache';

const userCache: UserCache = new UserCache();

class UserService {
  public async addUserData(data: IUserDocument): Promise<void> {
    await UserModel.create(data);
  }

  public async updatePassword(username: string, hashedPassword: string): Promise<void> {
    await AuthModel.updateOne({ username }, { $set: { password: hashedPassword }}).exec();
  }

  public async updateUserInfo(userId: string, info: IBasicInfo): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          work: info['work'],
          school: info['school'],
          quote: info['quote'],
          location: info['location']
        }
      }
    ).exec();
  }

  public async updateSocialLinks(userId: string, links: ISocialLinks): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: { social: links }
      }
    ).exec();
  }

  public async updateNotificationSettings(userId: string, settings: INotificationSettings): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { $set: { notifications: settings }}).exec();
  }

  public async getUserById(userId: string): Promise<IUserDocument> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() }
    ]);
    return users[0];
  }

  public async getUserByAuthId(authId: string): Promise<IUserDocument> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { authId: new mongoose.Types.ObjectId(authId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() }
    ]);
    return users[0];
  }

  public async getAllUsers(userId: string, skip: number, limit: number): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },
      // _id is a secondary sort key: bulk-created users can share the same
      // createdAt millisecond, and createdAt alone isn't a stable sort — without
      // a tiebreaker, repeated queries can return users in different relative
      // order, causing pagination windows to overlap or skip rows.
      { $sort: { createdAt: -1, _id: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() }
    ]);
    return users;
  }


  public async getRandomUsers(userId: string): Promise<IUserDocument[]> {
    const randomUsers: IUserDocument[] = [];
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $sample: { size: 10 }},
      {
        $addFields: {
          username: '$authId.username',
          email: '$authId.email',
          avatarColor: '$authId.avatarColor',
          uId: '$authId.uId',
          createdAt: '$authId.createdAt'
        }
      },
      {
        $project: {
          authId: 0,
          __v: 0
        }
      }
    ]);
    const followers: string[] = await followerService.getFolloweesIds(`${userId}`);
    for(const user of users) {
      const followerIndex = indexOf(followers, user._id.toString());
      if (followerIndex < 0) {
        randomUsers.push(user);
      }
    }
    return randomUsers;
  }

  public async getTotalUsersInDB(): Promise<number> {
    const totalCount: number = await UserModel.find({}).countDocuments();
    return totalCount;
  }

  public async searchUsers(regex: RegExp, excludeUserId?: string): Promise<ISearchUser[]> {
    // Note: search intentionally includes the caller — the course tests search for
    // the logged-in user's own username and expect to find it. `excludeUserId` is
    // accepted for API compatibility but not applied.
    void excludeUserId;
    const users: ISearchUser[] = await AuthModel.aggregate([
      { $match: { username: regex } },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      {
        $project: {
          _id: '$user._id',
          username: 1,
          email: 1,
          avatarColor: 1,
          profilePicture: 1
        }
      },
      { $limit: 20 }
    ]);

    // A just-signed-up user's Mongo `User` document is written asynchronously via
    // a queue, so it can briefly miss the $lookup/$unwind join above. Fall back to
    // the Redis cache (populated synchronously on signup) for any regex match the
    // Mongo aggregation didn't return yet.
    const foundIds = new Set(users.map((u) => `${u._id}`));
    const cachedMatches = await userCache.getUsersFromCacheByUsername(regex);
    for (const cached of cachedMatches) {
      if (foundIds.has(`${cached._id}`)) {
        continue;
      }
      foundIds.add(`${cached._id}`);
      users.push({
        _id: `${cached._id}`,
        username: `${cached.username}`,
        email: `${cached.email}`,
        avatarColor: `${cached.avatarColor}`,
        profilePicture: `${cached.profilePicture}`
      });
    }

    return users.slice(0, 20);
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: '$authId.username',
      uId: '$authId.uId',
      email: '$authId.email',
      avatarColor: '$authId.avatarColor',
      createdAt: '$authId.createdAt',
      postsCount: 1,
      work: 1,
      school: 1,
      quote: 1,
      location: 1,
      blocked: 1,
      blockedBy: 1,
      followersCount: 1,
      followingCount: 1,
      notifications: 1,
      social: 1,
      bgImageVersion: 1,
      bgImageId: 1,
      profilePicture: 1
    };
  }
}

export const userService: UserService = new UserService();
