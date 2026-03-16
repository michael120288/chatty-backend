import { blockedUserWorker } from '@worker/blocked.worker';
import { blockUserService } from '@service/db/block-user.service';

jest.mock('@service/db/block-user.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('BlockedUserWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls blockUserService.blockUser when type is "block"', async () => {
    const done = jest.fn();
    const job = mockJob({ keyOne: 'user1', keyTwo: 'user2', type: 'block' });
    (blockUserService.blockUser as jest.Mock).mockResolvedValueOnce(undefined);

    await blockedUserWorker.addBlockedUserToDB(job, done);

    expect(blockUserService.blockUser).toHaveBeenCalledWith('user1', 'user2');
    expect(blockUserService.unblockUser).not.toHaveBeenCalled();
    expect(job.progress).toHaveBeenCalledWith(100);
    expect(done).toHaveBeenCalledWith(null, job.data);
  });

  it('calls blockUserService.unblockUser when type is "unblock"', async () => {
    const done = jest.fn();
    const job = mockJob({ keyOne: 'user1', keyTwo: 'user2', type: 'unblock' });
    (blockUserService.unblockUser as jest.Mock).mockResolvedValueOnce(undefined);

    await blockedUserWorker.addBlockedUserToDB(job, done);

    expect(blockUserService.unblockUser).toHaveBeenCalledWith('user1', 'user2');
    expect(blockUserService.blockUser).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledWith(null, job.data);
  });

  it('calls done with error on failure', async () => {
    const done = jest.fn();
    const job = mockJob({ keyOne: 'a', keyTwo: 'b', type: 'block' });
    const err = new Error('Block failed');
    (blockUserService.blockUser as jest.Mock).mockRejectedValueOnce(err);

    await blockedUserWorker.addBlockedUserToDB(job, done);

    expect(done).toHaveBeenCalledWith(err);
  });
});
