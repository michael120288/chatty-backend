import { userService } from '@service/db/user.service';
import { UserModel } from '@user/models/user.schema';
import { AuthModel } from '@auth/models/auth.schema';
import { followerService } from '@service/db/follower.service';
import { UserCache } from '@service/redis/user.cache';

jest.mock('@user/models/user.schema');
jest.mock('@auth/models/auth.schema');
jest.mock('@service/db/follower.service');
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');

const userId1 = '507f1f77bcf86cd799439011';
const authId1 = '507f1f77bcf86cd799439020';
const mockUser = { _id: userId1, username: 'Alice', email: 'alice@test.com' } as any;

describe('UserService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addUserData', () => {
    it('calls UserModel.create with user data', async () => {
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
      await userService.addUserData(mockUser);
      expect(UserModel.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('updatePassword', () => {
    it('calls AuthModel.updateOne with username and hashed password', async () => {
      (AuthModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await userService.updatePassword('Alice', 'hashedPwd');
      expect(AuthModel.updateOne).toHaveBeenCalledWith(
        { username: 'Alice' },
        { $set: { password: 'hashedPwd' } }
      );
    });
  });

  describe('updateUserInfo', () => {
    it('calls UserModel.updateOne with userId and info fields', async () => {
      (UserModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await userService.updateUserInfo(userId1, { work: 'Dev', school: 'MIT', quote: 'Hi', location: 'NY' });
      expect(UserModel.updateOne).toHaveBeenCalledWith(
        { _id: userId1 },
        expect.objectContaining({ $set: expect.objectContaining({ work: 'Dev' }) })
      );
    });
  });

  describe('updateSocialLinks', () => {
    it('calls UserModel.updateOne with social links', async () => {
      (UserModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await userService.updateSocialLinks(userId1, { twitter: '@alice' } as any);
      expect(UserModel.updateOne).toHaveBeenCalledWith(
        { _id: userId1 },
        { $set: { social: { twitter: '@alice' } } }
      );
    });
  });

  describe('updateNotificationSettings', () => {
    it('calls UserModel.updateOne with notification settings', async () => {
      (UserModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await userService.updateNotificationSettings(userId1, { messages: false } as any);
      expect(UserModel.updateOne).toHaveBeenCalledWith(
        { _id: userId1 },
        { $set: { notifications: { messages: false } } }
      );
    });
  });

  describe('getUserById', () => {
    it('returns first user from aggregate result', async () => {
      (UserModel.aggregate as jest.Mock).mockResolvedValue([mockUser]);
      const result = await userService.getUserById(userId1);
      expect(UserModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserByAuthId', () => {
    it('returns first user from aggregate result', async () => {
      (UserModel.aggregate as jest.Mock).mockResolvedValue([mockUser]);
      const result = await userService.getUserByAuthId(authId1);
      expect(UserModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('returns array of users from aggregate', async () => {
      (UserModel.aggregate as jest.Mock).mockResolvedValue([mockUser]);
      const result = await userService.getAllUsers(userId1, 0, 10);
      expect(UserModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('getRandomUsers', () => {
    it('returns users not already followed', async () => {
      const user2Id = '507f1f77bcf86cd799439012';
      const user3Id = '507f1f77bcf86cd799439013';
      const user2 = { _id: { toString: () => user2Id } };
      const user3 = { _id: { toString: () => user3Id } };
      (UserModel.aggregate as jest.Mock).mockResolvedValue([user2, user3]);
      (followerService.getFolloweesIds as jest.Mock).mockResolvedValue([user2Id]);

      const result = await userService.getRandomUsers(userId1);

      expect(result).toEqual([user3]);
    });
  });

  describe('getTotalUsersInDB', () => {
    it('returns document count', async () => {
      (UserModel.find as jest.Mock).mockReturnValue({ countDocuments: jest.fn().mockResolvedValue(100) });
      const count = await userService.getTotalUsersInDB();
      expect(count).toBe(100);
    });
  });

  describe('searchUsers', () => {
    beforeEach(() => {
      (UserCache.prototype.getUsersFromCacheByUsername as jest.Mock).mockResolvedValue([]);
    });

    it('aggregates AuthModel with regex match and excludeUserId filter', async () => {
      (AuthModel.aggregate as jest.Mock).mockResolvedValue([mockUser]);
      const result = await userService.searchUsers(/alice/i, userId1);
      expect(AuthModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });

    it('aggregates without _id exclusion when no excludeUserId', async () => {
      (AuthModel.aggregate as jest.Mock).mockResolvedValue([mockUser]);
      const result = await userService.searchUsers(/alice/i);
      expect(result).toEqual([mockUser]);
    });

    it('adds cache matches not already returned by the Mongo aggregation', async () => {
      (AuthModel.aggregate as jest.Mock).mockResolvedValue([]);
      (UserCache.prototype.getUsersFromCacheByUsername as jest.Mock).mockResolvedValue([
        { _id: userId1, username: 'Alice', email: 'alice@test.com', avatarColor: 'red', profilePicture: '' }
      ]);
      const result = await userService.searchUsers(/alice/i);
      expect(result).toEqual([
        { _id: userId1, username: 'Alice', email: 'alice@test.com', avatarColor: 'red', profilePicture: '' }
      ]);
    });

    it('does not duplicate a user found by both Mongo and the cache', async () => {
      (AuthModel.aggregate as jest.Mock).mockResolvedValue([mockUser]);
      (UserCache.prototype.getUsersFromCacheByUsername as jest.Mock).mockResolvedValue([
        { _id: userId1, username: 'Alice', email: 'alice@test.com', avatarColor: 'red', profilePicture: '' }
      ]);
      const result = await userService.searchUsers(/alice/i);
      expect(result).toEqual([mockUser]);
    });
  });
});
