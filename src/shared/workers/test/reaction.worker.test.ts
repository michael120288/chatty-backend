import { reactionWorker } from '@worker/reaction.worker';
import { reactionService } from '@service/db/reaction.service';

jest.mock('@service/db/reaction.service');
jest.mock('@service/db/user.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('ReactionWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addReactionToDB', () => {
    it('calls reactionService.addReactionDataToDB with job.data', async () => {
      const data = { postId: 'p1', type: 'like', username: 'Alice' };
      const job = mockJob(data);
      (reactionService.addReactionDataToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await reactionWorker.addReactionToDB(job);

      expect(reactionService.addReactionDataToDB).toHaveBeenCalledWith(data);
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const data = { postId: 'p1' };
      const job = mockJob(data);
      const err = new Error('DB error');
      (reactionService.addReactionDataToDB as jest.Mock).mockRejectedValueOnce(err);

      await expect(reactionWorker.addReactionToDB(job)).rejects.toThrow('DB error');
    });
  });

  describe('removeReactionFromDB', () => {
    it('calls reactionService.removeReactionDataFromDB with job.data', async () => {
      const data = { postId: 'p1', previousReaction: 'like', postReactions: {} };
      const job = mockJob(data);
      (reactionService.removeReactionDataFromDB as jest.Mock).mockResolvedValueOnce(undefined);

      await reactionWorker.removeReactionFromDB(job);

      expect(reactionService.removeReactionDataFromDB).toHaveBeenCalledWith(data);
    });
  });
});
