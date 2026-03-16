import { followerWorker } from '@worker/follower.worker';
import { followerService } from '@service/db/follower.service';

jest.mock('@service/db/follower.service');
jest.mock('@service/db/auth.service');
jest.mock('@service/emails/mail.transport');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('FollowerWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addFollowerToDB', () => {
    it('calls followerService.addFollowerToDB with correct args', async () => {
      const done = jest.fn();
      const job = mockJob({ keyOne: 'user1', keyTwo: 'user2', username: 'Alice', followerDocumentId: 'doc123' });
      (followerService.addFollowerToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await followerWorker.addFollowerToDB(job, done);

      expect(followerService.addFollowerToDB).toHaveBeenCalledWith('user1', 'user2', 'Alice', 'doc123');
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ keyOne: 'a', keyTwo: 'b', username: 'u', followerDocumentId: 'd' });
      const err = new Error('DB error');
      (followerService.addFollowerToDB as jest.Mock).mockRejectedValueOnce(err);

      await followerWorker.addFollowerToDB(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });

  describe('removeFollowerFromDB', () => {
    it('calls followerService.removeFollowerFromDB with keyOne and keyTwo', async () => {
      const done = jest.fn();
      const job = mockJob({ keyOne: 'user1', keyTwo: 'user2' });
      (followerService.removeFollowerFromDB as jest.Mock).mockResolvedValueOnce(undefined);

      await followerWorker.removeFollowerFromDB(job, done);

      expect(followerService.removeFollowerFromDB).toHaveBeenCalledWith('user1', 'user2');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ keyOne: 'a', keyTwo: 'b' });
      const err = new Error('Not found');
      (followerService.removeFollowerFromDB as jest.Mock).mockRejectedValueOnce(err);

      await followerWorker.removeFollowerFromDB(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });
});
