import { followerService } from '@service/db/follower.service';
import { FollowerModel } from '@follower/models/follower.schema';
import { UserModel } from '@user/models/user.schema';
import { NotificationModel } from '@notification/models/notification.schema';
import { UserCache } from '@service/redis/user.cache';
import { socketIONotificationObject } from '@socket/notification';
import { emailQueue } from '@service/queues/email.queue';
import mongoose from 'mongoose';

jest.mock('@follower/models/follower.schema');
jest.mock('@user/models/user.schema');
jest.mock('@notification/models/notification.schema');
jest.mock('@service/redis/user.cache');
jest.mock('@socket/notification', () => ({ socketIONotificationObject: { emit: jest.fn() } }));
jest.mock('@service/emails/templates/notifications/notification-template', () => ({
  notificationTemplate: { notificationMessageTemplate: jest.fn().mockReturnValue('<html/>') }
}));
jest.mock('@service/queues/email.queue', () => ({ emailQueue: { addEmailJob: jest.fn() } }));
jest.mock('@service/queues/base.queue');

const userId1 = '507f1f77bcf86cd799439011';
const userId2 = '507f1f77bcf86cd799439012';
const followerDocId = new mongoose.Types.ObjectId();

describe('FollowerService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addFollowerToDB', () => {
    it('creates follower document and bulk-writes user counts', async () => {
      (FollowerModel.create as jest.Mock).mockResolvedValue({ _id: followerDocId });
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { follows: false },
        username: 'Bob',
        email: 'bob@test.com',
      } as any);

      await followerService.addFollowerToDB(userId1, userId2, 'Alice', followerDocId);

      expect(FollowerModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ _id: followerDocId })
      );
      expect(UserModel.bulkWrite).toHaveBeenCalled();
    });

    it('sends follow notification when follows enabled and userId !== followeeId', async () => {
      (FollowerModel.create as jest.Mock).mockResolvedValue({ _id: followerDocId });
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { follows: true },
        username: 'Bob',
        email: 'bob@test.com',
      } as any);
      const insertNotification = jest.fn().mockResolvedValue({ _id: 'notif1' });
      (NotificationModel as unknown as jest.Mock).mockImplementation(() => ({ insertNotification }));

      await followerService.addFollowerToDB(userId1, userId2, 'Alice', followerDocId);

      expect(insertNotification).toHaveBeenCalled();
      expect(socketIONotificationObject.emit).toHaveBeenCalledWith('insert notification', expect.anything(), { userTo: userId2 });
      expect(emailQueue.addEmailJob).toHaveBeenCalledWith('followersEmail', expect.objectContaining({ receiverEmail: 'bob@test.com' }));
    });

    it('does not send notification when userId === followeeId', async () => {
      (FollowerModel.create as jest.Mock).mockResolvedValue({ _id: followerDocId });
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { follows: true },
        username: 'Alice',
        email: 'alice@test.com',
      } as any);

      await followerService.addFollowerToDB(userId1, userId1, 'Alice', followerDocId);

      expect(socketIONotificationObject.emit).not.toHaveBeenCalled();
    });
  });

  describe('removeFollowerFromDB', () => {
    it('deletes follower document and decrements user counts', async () => {
      (FollowerModel.deleteOne as jest.Mock).mockResolvedValue({});
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});

      await followerService.removeFollowerFromDB(userId2, userId1);

      expect(FollowerModel.deleteOne).toHaveBeenCalledWith(
        expect.objectContaining({ followeeId: expect.anything(), followerId: expect.anything() })
      );
      expect(UserModel.bulkWrite).toHaveBeenCalled();
    });
  });

  describe('getFolloweeData', () => {
    it('returns aggregated followee data', async () => {
      const followees = [{ _id: userId2, username: 'Bob' }];
      (FollowerModel.aggregate as jest.Mock).mockResolvedValue(followees);
      const id = new mongoose.Types.ObjectId();
      const result = await followerService.getFolloweeData(id);
      expect(FollowerModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual(followees);
    });
  });

  describe('getFollowerData', () => {
    it('returns aggregated follower data', async () => {
      const followers = [{ _id: userId1, username: 'Alice' }];
      (FollowerModel.aggregate as jest.Mock).mockResolvedValue(followers);
      const id = new mongoose.Types.ObjectId();
      const result = await followerService.getFollowerData(id);
      expect(result).toEqual(followers);
    });
  });

  describe('getFolloweesIds', () => {
    it('returns array of followee id strings', async () => {
      const objId = new mongoose.Types.ObjectId();
      (FollowerModel.aggregate as jest.Mock).mockResolvedValue([{ followeeId: objId }]);
      const result = await followerService.getFolloweesIds(userId1);
      expect(result).toEqual([objId.toString()]);
    });
  });
});
