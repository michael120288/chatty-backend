import { emailWorker } from '@worker/email.worker';
import { mailTransport } from '@service/emails/mail.transport';

jest.mock('@service/emails/mail.transport');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object, id = '42') =>
  ({
    id,
    data,
    progress: jest.fn(),
  }) as any;

describe('EmailWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls mailTransport.sendEmail with template, receiverEmail and subject', async () => {
    const done = jest.fn();
    const jobData = { template: '<h1>Hi</h1>', receiverEmail: 'user@example.com', subject: 'Welcome' };
    const job = mockJob(jobData);
    (mailTransport.sendEmail as jest.Mock).mockResolvedValueOnce(undefined);

    await emailWorker.addNotificationEmail(job, done);

    expect(mailTransport.sendEmail).toHaveBeenCalledWith(
      jobData.receiverEmail,
      jobData.subject,
      jobData.template
    );
    expect(job.progress).toHaveBeenCalledWith(100);
    expect(done).toHaveBeenCalledWith(null, job.data);
  });

  it('calls done with error when sendEmail throws', async () => {
    const done = jest.fn();
    const job = mockJob({ template: '', receiverEmail: 'x@y.com', subject: 'Test' });
    const err = new Error('SMTP error');
    (mailTransport.sendEmail as jest.Mock).mockRejectedValueOnce(err);

    await emailWorker.addNotificationEmail(job, done);

    expect(done).toHaveBeenCalledWith(err);
  });
});
