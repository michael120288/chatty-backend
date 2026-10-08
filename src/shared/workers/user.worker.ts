import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { userService } from '@service/db/user.service';

const log: Logger = config.createLogger('authWorker');

class UserWorker {
  async addUserToDB(job: Job): Promise<void> {
    const { value } = job.data;
    await userService.addUserData(value);
    job.progress(100);
  }

  async updateUserInfo(job: Job): Promise<void> {
    const { key, value } = job.data;
    await userService.updateUserInfo(key, value);
    job.progress(100);
  }

  async updateSocialLinks(job: Job): Promise<void> {
    const { key, value } = job.data;
    await userService.updateSocialLinks(key, value);
    job.progress(100);
  }

  async updateNotificationSettings(job: Job): Promise<void> {
    const { key, value } = job.data;
    await userService.updateNotificationSettings(key, value);
    job.progress(100);
  }
}

export const userWorker: UserWorker = new UserWorker();
