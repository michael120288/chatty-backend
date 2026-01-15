import { BaseQueue } from '@service/queues/base.queue';
import { IEmailJob } from '@user/interfaces/user.interface';
import { emailWorker } from '@worker/email.worker';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('emailQueue');

class EmailQueue extends BaseQueue{
  constructor() {
    super('emails');
    this.processJob('forgotPasswordEmail',5,emailWorker.addNotificationEmail);
    this.processJob('commentsEmail',5,emailWorker.addNotificationEmail);
    this.processJob('followersEmail', 5, emailWorker.addNotificationEmail);
    this.processJob('reactionsEmail', 5, emailWorker.addNotificationEmail);
    this.processJob('directMessageEmail', 5, emailWorker.addNotificationEmail);
    this.processJob('changePassword', 5, emailWorker.addNotificationEmail);

  }

  public addEmailJob(name: string, data: IEmailJob): void {
    log.info(`Adding email job to queue: ${name}, recipient: ${data.receiverEmail}, subject: ${data.subject}`);
    this.addJob(name, data);
  }
}

export const emailQueue: EmailQueue = new EmailQueue();