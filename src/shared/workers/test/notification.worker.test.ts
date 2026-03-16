import { notificationWorker } from '@worker/notification.worker';
import { notificationService } from '@service/db/notification.service';

jest.mock('@service/db/notification.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('NotificationWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('updateNotification', () => {
    it('calls notificationService.updateNotification with the key', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'notif123' });
      (notificationService.updateNotification as jest.Mock).mockResolvedValueOnce(undefined);

      await notificationWorker.updateNotification(job, done);

      expect(notificationService.updateNotification).toHaveBeenCalledWith('notif123');
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'k' });
      const err = new Error('Update failed');
      (notificationService.updateNotification as jest.Mock).mockRejectedValueOnce(err);

      await notificationWorker.updateNotification(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });

  describe('deleteNotification', () => {
    it('calls notificationService.deleteNotification with the key', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'notif456' });
      (notificationService.deleteNotification as jest.Mock).mockResolvedValueOnce(undefined);

      await notificationWorker.deleteNotification(job, done);

      expect(notificationService.deleteNotification).toHaveBeenCalledWith('notif456');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'k' });
      const err = new Error('Delete failed');
      (notificationService.deleteNotification as jest.Mock).mockRejectedValueOnce(err);

      await notificationWorker.deleteNotification(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });
});
