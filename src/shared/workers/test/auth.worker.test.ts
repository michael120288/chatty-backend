import { authWorker } from '@worker/auth.worker';
import { authService } from '@service/db/auth.service';

jest.mock('@service/db/auth.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) =>
  ({
    data,
    progress: jest.fn(),
  }) as any;

describe('AuthWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls authService.createAuthUser with job.data.value', async () => {
    const value = { username: 'Manny', email: 'manny@me.com' };
    const job = mockJob({ value });
    (authService.createAuthUser as jest.Mock).mockResolvedValueOnce({});

    await authWorker.addAuthUserToDB(job);

    expect(authService.createAuthUser).toHaveBeenCalledWith(value);
    expect(job.progress).toHaveBeenCalledWith(100);
  });

  it('rejects when createAuthUser throws', async () => {
    const job = mockJob({ value: {} });
    const err = new Error('DB error');
    (authService.createAuthUser as jest.Mock).mockRejectedValueOnce(err);

    await expect(authWorker.addAuthUserToDB(job)).rejects.toThrow('DB error');
  });
});
