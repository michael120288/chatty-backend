import { commentWorker } from '@worker/comment.worker';
import { commentService } from '@service/db/comment.service';

jest.mock('@service/db/comment.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('CommentWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addCommentToDB', () => {
    it('calls commentService.addCommentToDB with job.data', async () => {
      const data = { postId: 'p1', comment: 'Nice post' };
      const job = mockJob(data);
      (commentService.addCommentToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await commentWorker.addCommentToDB(job);

      expect(commentService.addCommentToDB).toHaveBeenCalledWith(data);
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const job = mockJob({});
      const err = new Error('DB error');
      (commentService.addCommentToDB as jest.Mock).mockRejectedValueOnce(err);

      await expect(commentWorker.addCommentToDB(job)).rejects.toThrow('DB error');
    });
  });

  describe('deleteCommentFromDB', () => {
    it('calls commentService.deleteCommentFromDB with postId, commentId and username', async () => {
      const job = mockJob({ postId: 'post1', commentId: 'comment1', username: 'testuser' });
      (commentService.deleteCommentFromDB as jest.Mock).mockResolvedValueOnce(undefined);

      await commentWorker.deleteCommentFromDB(job);

      expect(commentService.deleteCommentFromDB).toHaveBeenCalledWith('post1', 'comment1', 'testuser');
    });

    it('rejects on failure', async () => {
      const job = mockJob({ postId: 'p', commentId: 'c', username: 'u' });
      const err = new Error('Delete failed');
      (commentService.deleteCommentFromDB as jest.Mock).mockRejectedValueOnce(err);

      await expect(commentWorker.deleteCommentFromDB(job)).rejects.toThrow('Delete failed');
    });
  });
});
