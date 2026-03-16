import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { reactionService } from '@service/db/reaction.service';

const log: Logger = config.createLogger('reactionWorker');

class ReactionWorker {
  async addReactionToDB(job: Job): Promise<void> {
    await reactionService.addReactionDataToDB(job.data);
    job.progress(100);
  }

  async removeReactionFromDB(job: Job): Promise<void> {
    await reactionService.removeReactionDataFromDB(job.data);
    job.progress(100);
  }
}

export const reactionWorker: ReactionWorker = new ReactionWorker();
