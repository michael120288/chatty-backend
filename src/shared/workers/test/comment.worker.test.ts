import { commentWorker } from '@worker/comment.worker';
import { commentService } from '@service/db/comment.service';

jest.mock('@service/db/comment.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('CommentWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addCommentToDB', () => {
    it('calls commentService.addCommentToDB with job.data', async () => {
      const done = jest.fn();
      const data = { postId: 'p1', comment: 'Nice post' };
      const job = mockJob(data);
      (commentService.addCommentToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await commentWorker.addCommentToDB(job, done);

      expect(commentService.addCommentToDB).toHaveBeenCalledWith(data);
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({});
      const err = new Error('DB error');
      (commentService.addCommentToDB as jest.Mock).mockRejectedValueOnce(err);

      await commentWorker.addCommentToDB(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });

  describe('deleteCommentFromDB', () => {
    it('calls commentService.deleteCommentFromDB with postId and commentId', async () => {
      const done = jest.fn();
      const job = mockJob({ postId: 'post1', commentId: 'comment1' });
      (commentService.deleteCommentFromDB as jest.Mock).mockResolvedValueOnce(undefined);

      await commentWorker.deleteCommentFromDB(job, done);

      expect(commentService.deleteCommentFromDB).toHaveBeenCalledWith('post1', 'comment1');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ postId: 'p', commentId: 'c' });
      const err = new Error('Delete failed');
      (commentService.deleteCommentFromDB as jest.Mock).mockRejectedValueOnce(err);

      await commentWorker.deleteCommentFromDB(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });
});
