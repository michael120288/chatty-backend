import { BaseCache } from '@service/redis/base.cache';
import { INotificationSettings, ISocialLinks, IUserDocument } from '@user/interfaces/user.interface';
import Logger from 'bunyan';
import { config } from '@root/config';
import { ServerError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helpers';

const log: Logger = config.createLogger('userCache');
type UserItem = string | ISocialLinks | INotificationSettings

export class UserCache extends BaseCache {
  constructor() {
    super('userCache');
  }

  public async saveUserToCache(
    key: string,
    userUId: string,
    createdUser: IUserDocument,
  ): Promise<void> {
    const createdAt = new Date();
    const {
      _id,
      authId,
      username,
      email,
      avatarColor,
      uId,
      postsCount,
      work,
      school,
      quote,
      location,
      blocked,
      blockedBy,
      followersCount,
      followingCount,
      notifications,
      social,
      bgImageVersion,
      bgImageId,
      profilePicture,
    } = createdUser;
    const firstList: string[] = [
      '_id',
      `${_id}`,
      'authId',
      `${authId}`,
      'username',
      `${username}`,
      'email',
      `${email}`,
      'avatarColor',
      `${avatarColor}`,
      'uId',
      `${uId}`,
      'postsCount',
      `${postsCount}`,
    ];
    const secondList: string[] = [
      'blocked',
      JSON.stringify(blocked),
      'blockedBy',
      JSON.stringify(blockedBy),
      'followersCount',
      `${followersCount}`,
      'notifications',
      JSON.stringify(notifications),
      'social',
      JSON.stringify(social),
    ];
    const thirdList: string[] = [
      'work',
      `${work}`,
      'school',
      `${school}`,
      'quote',
      `${quote}`,
      'location',
      `${location}`,
      'bgImageVersion',
      `${bgImageVersion}`,
      'bgImageId',
      `${bgImageId}`,
    ];
    const dataToSave: string[] = [...firstList, ...secondList, ...thirdList];

    // try {
    //   if(!this.client.isOpen) {
    //     await this.client.connect()
    //   }
    //   await this.client.ZADD('user',{score:parseInt(userUId,10),value:`${key}`})
    //   await this.client.HSET(`user:${key}`,dataToSave)
    // } catch (error) {
    //   log.error(error)
    //   throw new ServerError('Server error. Try again')
    // }
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      await this.client.ZADD('user', {
        score: parseInt(userUId, 10),
        value: `${key}`,
      });
      for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
        await this.client.HSET(`users:${key}`, `${itemKey}`, `${itemValue}`);
      }
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
  public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const response: IUserDocument = (await this.client.HGETALL(
        `users:${userId}`,
      )) as unknown as IUserDocument;

      response.createdAt = new Date(Helpers.parseJson(`${response.createdAt}`));
      response.postsCount = Helpers.parseJson(`${response.postsCount}`);
      response.followersCount = Helpers.parseJson(`${response.followersCount}`);
      response.followingCount = Helpers.parseJson(`${response.followingCount}`);
      response.notifications = Helpers.parseJson(`${response.notifications}`);
      response.social = Helpers.parseJson(`${response.social}`);
      response.blocked = Helpers.parseJson(`${response.blocked}`);
      response.blockedBy = Helpers.parseJson(`${response.blockedBy}`);
      response.bgImageId = Helpers.parseJson(`${response.bgImageId}`);
      response.bgImageVersion = Helpers.parseJson(`${response.bgImageVersion}`);
      response.profilePicture = Helpers.parseJson(`${response.profilePicture}`);

      return response;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again');
    }
  }

  public async updateSingleUserItemInCache(userId: string, prop: string, value: UserItem): Promise<IUserDocument | null> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      await this.client.HSET(`users:${userId}`, `${prop}`, JSON.stringify(value));
      const response: IUserDocument = (await this.getUserFromCache(userId)) as IUserDocument;
      return response;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
}
