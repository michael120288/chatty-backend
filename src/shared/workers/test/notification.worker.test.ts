import { notificationWorker } from '@worker/notification.worker';
import { notificationService } from '@service/db/notification.service';

jest.mock('@service/db/notification.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('NotificationWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('updateNotification', () => {
    it('calls notificationService.updateNotification with key and userId', async () => {
      const job = mockJob({ key: 'notif123', userId: 'user1' });
      (notificationService.updateNotification as jest.Mock).mockResolvedValueOnce(undefined);

      await notificationWorker.updateNotification(job);

      expect(notificationService.updateNotification).toHaveBeenCalledWith('notif123', 'user1');
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const job = mockJob({ key: 'k', userId: 'u' });
      const err = new Error('Update failed');
      (notificationService.updateNotification as jest.Mock).mockRejectedValueOnce(err);

      await expect(notificationWorker.updateNotification(job)).rejects.toThrow('Update failed');
    });
  });

  describe('deleteNotification', () => {
    it('calls notificationService.deleteNotification with key and userId', async () => {
      const job = mockJob({ key: 'notif456', userId: 'user1' });
      (notificationService.deleteNotification as jest.Mock).mockResolvedValueOnce(undefined);

      await notificationWorker.deleteNotification(job);

      expect(notificationService.deleteNotification).toHaveBeenCalledWith('notif456', 'user1');
    });

    it('rejects on failure', async () => {
      const job = mockJob({ key: 'k', userId: 'u' });
      const err = new Error('Delete failed');
      (notificationService.deleteNotification as jest.Mock).mockRejectedValueOnce(err);

      await expect(notificationWorker.deleteNotification(job)).rejects.toThrow('Delete failed');
    });
  });
});
