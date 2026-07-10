import { blockedUserWorker } from '@worker/blocked.worker';
import { blockUserService } from '@service/db/block-user.service';

jest.mock('@service/db/block-user.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('BlockedUserWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls blockUserService.blockUser when type is "block"', async () => {
    const job = mockJob({ keyOne: 'user1', keyTwo: 'user2', type: 'block' });
    (blockUserService.blockUser as jest.Mock).mockResolvedValueOnce(undefined);

    await blockedUserWorker.addBlockedUserToDB(job);

    expect(blockUserService.blockUser).toHaveBeenCalledWith('user1', 'user2');
    expect(blockUserService.unblockUser).not.toHaveBeenCalled();
    expect(job.progress).toHaveBeenCalledWith(100);
  });

  it('calls blockUserService.unblockUser when type is "unblock"', async () => {
    const job = mockJob({ keyOne: 'user1', keyTwo: 'user2', type: 'unblock' });
    (blockUserService.unblockUser as jest.Mock).mockResolvedValueOnce(undefined);

    await blockedUserWorker.addBlockedUserToDB(job);

    expect(blockUserService.unblockUser).toHaveBeenCalledWith('user1', 'user2');
    expect(blockUserService.blockUser).not.toHaveBeenCalled();
  });

  it('rejects on failure', async () => {
    const job = mockJob({ keyOne: 'a', keyTwo: 'b', type: 'block' });
    const err = new Error('Block failed');
    (blockUserService.blockUser as jest.Mock).mockRejectedValueOnce(err);

    await expect(blockedUserWorker.addBlockedUserToDB(job)).rejects.toThrow('Block failed');
  });
});
