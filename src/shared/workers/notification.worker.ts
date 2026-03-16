import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { notificationService } from '@service/db/notification.service';

const log: Logger = config.createLogger('notificationWorker');

class NotificationWorker {
  async updateNotification(job: Job): Promise<void> {
    const { key } = job.data;
    await notificationService.updateNotification(key);
    job.progress(100);
  }

  async deleteNotification(job: Job): Promise<void> {
    const { key } = job.data;
    await notificationService.deleteNotification(key);
    job.progress(100);
  }
}

export const notificationWorker: NotificationWorker = new NotificationWorker();
