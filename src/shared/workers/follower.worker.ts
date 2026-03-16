import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { followerService } from '@service/db/follower.service';

const log: Logger = config.createLogger('emailWorker');

class FollowerWorker {
  async addFollowerToDB(job: Job): Promise<void> {
    const { keyOne, keyTwo, username, followerDocumentId } = job.data;
    await followerService.addFollowerToDB(keyOne, keyTwo, username, followerDocumentId);
    job.progress(100);
  }

  async removeFollowerFromDB(job: Job): Promise<void> {
    const { keyOne, keyTwo } = job.data;
    await followerService.removeFollowerFromDB(keyOne, keyTwo);
    job.progress(100);
  }
}

export const followerWorker: FollowerWorker = new FollowerWorker();
