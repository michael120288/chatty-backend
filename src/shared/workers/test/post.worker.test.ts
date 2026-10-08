import { postWorker } from '@worker/post.worker';
import { postService } from '@service/db/post.service';

jest.mock('@service/db/post.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) =>
  ({
    data,
    progress: jest.fn(),
  }) as any;

describe('PostWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('savePostToDB', () => {
    it('calls postService.addPostToDB with key and value', async () => {
      const job = mockJob({ key: 'user123', value: { post: 'Hello world' } });
      (postService.addPostToDB as jest.Mock).mockResolvedValueOnce({});

      await postWorker.savePostToDB(job);

      expect(postService.addPostToDB).toHaveBeenCalledWith('user123', { post: 'Hello world' });
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const job = mockJob({ key: 'k', value: {} });
      const err = new Error('DB error');
      (postService.addPostToDB as jest.Mock).mockRejectedValueOnce(err);

      await expect(postWorker.savePostToDB(job)).rejects.toThrow('DB error');
    });
  });

  describe('deletePostFromDB', () => {
    it('calls postService.deletePost with keyOne and keyTwo', async () => {
      const job = mockJob({ keyOne: 'postId123', keyTwo: 'userId456' });
      (postService.deletePost as jest.Mock).mockResolvedValueOnce(undefined);

      await postWorker.deletePostFromDB(job);

      expect(postService.deletePost).toHaveBeenCalledWith('postId123', 'userId456');
    });

    it('rejects on failure', async () => {
      const job = mockJob({ keyOne: 'a', keyTwo: 'b' });
      const err = new Error('Not found');
      (postService.deletePost as jest.Mock).mockRejectedValueOnce(err);

      await expect(postWorker.deletePostFromDB(job)).rejects.toThrow('Not found');
    });
  });

  describe('updatePostInDB', () => {
    it('calls postService.editPost with key and value', async () => {
      const job = mockJob({ key: 'postId123', value: { post: 'Updated text' } });
      (postService.editPost as jest.Mock).mockResolvedValueOnce({});

      await postWorker.updatePostInDB(job);

      expect(postService.editPost).toHaveBeenCalledWith('postId123', { post: 'Updated text' });
    });

    it('rejects on failure', async () => {
      const job = mockJob({ key: 'k', value: {} });
      const err = new Error('Edit failed');
      (postService.editPost as jest.Mock).mockRejectedValueOnce(err);

      await expect(postWorker.updatePostInDB(job)).rejects.toThrow('Edit failed');
    });
  });
});
