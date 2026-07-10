import { notificationService } from '@service/db/notification.service';
import { NotificationModel } from '@notification/models/notification.schema';

jest.mock('@notification/models/notification.schema');
jest.mock('@service/queues/base.queue');

const userId1 = '507f1f77bcf86cd799439011';
const notifId1 = '507f1f77bcf86cd799439015';
const mockNotifications = [{ _id: notifId1, message: 'test', read: false }];

describe('NotificationService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getNotifications', () => {
    it('returns aggregated notifications for userId', async () => {
      (NotificationModel.aggregate as jest.Mock).mockResolvedValue(mockNotifications);
      const result = await notificationService.getNotifications(userId1);
      expect(NotificationModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockNotifications);
    });
  });

  describe('updateNotification', () => {
    it('calls NotificationModel.updateOne with notificationId and read:true', async () => {
      (NotificationModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await notificationService.updateNotification(notifId1, userId1);
      expect(NotificationModel.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: notifId1 }),
        { $set: { read: true } }
      );
    });
  });

  describe('deleteNotification', () => {
    it('calls NotificationModel.deleteOne with notificationId', async () => {
      (NotificationModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await notificationService.deleteNotification(notifId1, userId1);
      expect(NotificationModel.deleteOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: notifId1 })
      );
    });
  });
});
