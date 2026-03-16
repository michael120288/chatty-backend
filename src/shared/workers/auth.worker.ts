import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { authService } from '@service/db/auth.service';

const log: Logger = config.createLogger('authWorker');

class AuthWorker {
  async addAuthUserToDB(job: Job): Promise<void> {
    const { value } = job.data;
    await authService.createAuthUser(value);
    job.progress(100);
  }
}

export const authWorker: AuthWorker = new AuthWorker();
