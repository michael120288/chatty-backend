import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { mailTransport } from '@service/emails/mail.transport';

const log: Logger = config.createLogger('emailWorker');

class EmailWorker {
  async addNotificationEmail(job: Job): Promise<void> {
    const { template, receiverEmail, subject } = job.data;
    log.info(`Email worker processing job ${job.id}: Sending email to ${receiverEmail} with subject "${subject}"`);
    await mailTransport.sendEmail(receiverEmail, subject, template);
    log.info(`Email worker completed job ${job.id} successfully`);
    job.progress(100);
  }
}

export const emailWorker: EmailWorker = new EmailWorker();
