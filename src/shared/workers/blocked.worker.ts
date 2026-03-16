import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { blockUserService } from '@service/db/block-user.service';

const log: Logger = config.createLogger('blockedUserWorker');

class BlockedUserWorker {
  async addBlockedUserToDB(job: Job): Promise<void> {
    const { keyOne, keyTwo, type } = job.data;
    if (type === 'block') {
      await blockUserService.blockUser(keyOne, keyTwo);
    } else {
      await blockUserService.unblockUser(keyOne, keyTwo);
    }
    job.progress(100);
  }
}

export const blockedUserWorker: BlockedUserWorker = new BlockedUserWorker();
