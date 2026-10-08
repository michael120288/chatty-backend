import { BaseCache } from '@service/redis/base.cache';
import {
  INotificationSettings,
  ISocialLinks,
  IUserDocument,
} from '@user/interfaces/user.interface';
import Logger from 'bunyan';
import { indexOf, findIndex } from 'lodash';
import { Types } from 'mongoose';
import { config } from '@root/config';
import { ServerError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helpers';
import { RedisCommandRawReply } from '@redis/client/dist/lib/commands';

const log: Logger = config.createLogger('userCache');
type UserItem = string | ISocialLinks | INotificationSettings;
type UserCacheMultiType =
  | string
  | number
  | Buffer
  | RedisCommandRawReply[]
  | IUserDocument
  | IUserDocument[];


export class UserCache extends BaseCache {
  constructor() {
    super('userCache');
  }

  public async saveUserToCache(key: string, userUId: string, createdUser: IUserDocument): Promise<void> {
    const createdAt = new Date();
    const {
      _id,
      uId,
      username,
      email,
      avatarColor,
      blocked,
      blockedBy,
      postsCount,
      profilePicture,
      followersCount,
      followingCount,
      notifications,
      work,
      location,
      school,
      quote,
      bgImageId,
      bgImageVersion,
      social,
    } = createdUser;
    const firstObj = {
      _id: `${_id}`,
      uId: `${uId}`,
      username: `${username}`,
      email: `${email}`,
      avatarColor: `${avatarColor}`,
      createdAt: `${createdAt}`,
      postsCount: `${postsCount}`,
    };
    const secondObj = {
      blocked: JSON.stringify(blocked),
      blockedBy: JSON.stringify(blockedBy),
      profilePicture: `${profilePicture}`,
      followersCount: `${followersCount}`,
      followingCount: `${followingCount}`,
      notifications: JSON.stringify(notifications),
      social: JSON.stringify(social),
    };
    const thirdObj = {
      work: `${work}`,
      location: `${location}`,
      school: `${school}`,
      quote: `${quote}`,
      bgImageVersion: `${bgImageVersion}`,
      bgImageId: `${bgImageId}`,
    };
    const dataToSave = {...firstObj, ...secondObj, ...thirdObj}


    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      await this.client.ZADD('user', {
        score: parseInt(userUId, 10),
        value: `${key}`,
      });
      await this.client.HSET(`users:${key}`, dataToSave);
      await this.client.expire(`users:${key}`, 86400);

    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  // Counterpart to saveUserToCache: removes both the 'user' ZSET member and
  // the users:<key> hash. Without this, a deleted user's id stays in the
  // ZSET forever — GET /user/all/:page then returns it as a ghost entry with
  // every field undefined once the hash's TTL expires (or immediately if the
  // hash is deleted directly), corrupting pagination indefinitely.
  public async removeUserFromCache(key: string): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      await this.client.ZREM('user', key);
      await this.client.DEL(`users:${key}`);
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  // Shared by every cache read that HGETALLs a users:<id> hash. A hash that's
  // missing individual fields (a partially-expired/corrupted entry, not a
  // fully-missing one) used to have those fields template-coerced to the
  // literal string "undefined" before being handed to Helpers.parseJson,
  // which can't parse that and hands the corrupt string straight back —
  // silently propagating "undefined" text into API responses, and worse,
  // into `new mongoose.Types.ObjectId(user._id)` calls elsewhere (e.g.
  // follower.cache.ts), which fabricates a brand-new random id rather than
  // throwing when given something that isn't a real id.
  private normalizeUserFields(user: IUserDocument): IUserDocument {
    user.createdAt = new Date(Helpers.parseJsonSafe(user.createdAt, Date.now()));
    user.postsCount = Helpers.parseJsonSafe(user.postsCount, 0);
    user.blocked = Helpers.parseJsonSafe(user.blocked, []);
    user.blockedBy = Helpers.parseJsonSafe(user.blockedBy, []);
    user.notifications = Helpers.parseJsonSafe(user.notifications, {
      messages: true,
      reactions: true,
      comments: true,
      follows: true
    });
    user.social = Helpers.parseJsonSafe(user.social, { facebook: '', instagram: '', twitter: '', youtube: '' });
    user.followersCount = Helpers.parseJsonSafe(user.followersCount, 0);
    user.followingCount = Helpers.parseJsonSafe(user.followingCount, 0);
    user.bgImageId = Helpers.parseJsonSafe(user.bgImageId, '');
    user.bgImageVersion = Helpers.parseJsonSafe(user.bgImageVersion, '');
    user.profilePicture = Helpers.parseJsonSafe(user.profilePicture, '');
    return user;
  }

  public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const raw = await this.client.HGETALL(`users:${userId}`);

      // Key not found, or present but missing/invalid _id (a corrupted or
      // partially-expired hash) — fail closed rather than let a broken
      // record propagate downstream. See getUsersFromCache for the same
      // guard applied to the paginated list read.
      if (!raw || Object.keys(raw).length === 0 || !raw._id || !Types.ObjectId.isValid(raw._id)) {
        return null;
      }

      const response = raw as unknown as IUserDocument;

      return this.normalizeUserFields(response);
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');

    }
  }

  public async getUsersFromCache(
    start: number,
    end: number,
    excludedUserKey: string,
  ): Promise<IUserDocument[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const response: string[] = await this.client.ZRANGE('user', start, end, {
        REV: true,
      });
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      for (const key of response) {
        if (key !== excludedUserKey) {
          multi.HGETALL(`users:${key}`);
        }
      }
      const replies: UserCacheMultiType =
        (await multi.exec()) as UserCacheMultiType;
      const userReplies: IUserDocument[] = [];
      for (const reply of replies as IUserDocument[]) {
        // HGETALL on a key that no longer exists (TTL-expired, or the user
        // was deleted without evicting the 'user' ZSET member) returns {} —
        // not an error. Without this guard that empty object gets returned
        // as a "user" with every field undefined, corrupting pagination.
        if (!reply || !reply._id || !Types.ObjectId.isValid(reply._id as unknown as string)) {
          continue;
        }
        userReplies.push(this.normalizeUserFields(reply));
      }
      return userReplies;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getRandomUsersFromCache(
    userId: string,
    excludedUsername: string,
  ): Promise<IUserDocument[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const replies: IUserDocument[] = [];
      const followers: string[] = await this.client.LRANGE(
        `followers:${userId}`,
        0,
        -1,
      );
      const users: string[] = await this.client.ZRANGE('user', 0, -1);
      const randomUsers: string[] = Helpers.shuffle(users).slice(0, 10);
      for (const key of randomUsers) {
        const followerIndex = indexOf(followers, key);
        if (followerIndex < 0) {
          const userHash: IUserDocument = (await this.client.HGETALL(
            `users:${key}`,
          )) as unknown as IUserDocument;
          if (
            Object.keys(userHash).length &&
            userHash.username &&
            userHash._id &&
            Types.ObjectId.isValid(userHash._id as unknown as string)
          ) {
            replies.push(userHash);
          }
        }
      }
      const excludedUsernameIndex: number = findIndex(replies, [
        'username',
        excludedUsername,
      ]);
      replies.splice(excludedUsernameIndex, 1);
      for (const reply of replies) {
        this.normalizeUserFields(reply);
      }
      return replies;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async updateSingleUserItemInCache(
    userId: string,
    prop: string,
    value: UserItem,
  ): Promise<IUserDocument | null> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      // Store plain strings as-is; only JSON-encode non-string values (objects like
      // `social`/`notifications`). Previously every value was JSON.stringify'd, which
      // wrapped string fields (work/school/location/quote) in literal double quotes
      // that were never parsed back on read — a data-integrity bug that returned
      // `"value"` instead of `value`.
      const encoded: string = typeof value === 'string' ? value : JSON.stringify(value);
      await this.client.HSET(`users:${userId}`, `${prop}`, encoded);
      const response: IUserDocument = (await this.getUserFromCache(
        userId,
      )) as IUserDocument;

      return response;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  // Backs search-user's Mongo query: the User profile document is written to
  // Mongo asynchronously via a queue (see signup.ts), so a just-created user
  // can be briefly absent from the Mongo-side $lookup/$unwind join. Checking
  // the cache (populated synchronously on signup) closes that race.
  public async getUsersFromCacheByUsername(regex: RegExp): Promise<IUserDocument[]> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const keys: string[] = await this.client.ZRANGE('user', 0, -1);
      const multi: ReturnType<typeof this.client.multi> = this.client.multi();
      for (const key of keys) {
        multi.HGETALL(`users:${key}`);
      }
      const replies: UserCacheMultiType = (await multi.exec()) as UserCacheMultiType;
      const matched: IUserDocument[] = [];
      for (const reply of replies as IUserDocument[]) {
        if (!reply || !reply._id || !reply.username || !regex.test(`${reply.username}`)) {
          continue;
        }
        matched.push(reply);
      }
      return matched;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getTotalUsersInCache(): Promise<number> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const count: number = await this.client.ZCARD('user');
      return count;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
}

