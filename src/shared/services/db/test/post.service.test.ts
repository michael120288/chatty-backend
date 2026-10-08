import { postService } from '@service/db/post.service';
import { PostModel } from '@post/models/post.schema';
import { UserModel } from '@user/models/user.schema';

jest.mock('@post/models/post.schema');
jest.mock('@user/models/user.schema');
jest.mock('@service/queues/base.queue');

const mockPost = { _id: 'post1', post: 'Hello world', bgColor: '#fff', privacy: 'Public' } as any;

describe('PostService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addPostToDB', () => {
    it('creates post and increments user postsCount', async () => {
      (PostModel.create as jest.Mock).mockResolvedValue(mockPost);
      (UserModel.updateOne as jest.Mock).mockResolvedValue({});

      await postService.addPostToDB('user1', mockPost);

      expect(PostModel.create).toHaveBeenCalledWith(mockPost);
      expect(UserModel.updateOne).toHaveBeenCalledWith({ _id: 'user1' }, { $inc: { postsCount: 1 } });
    });
  });

  describe('getPosts', () => {
    it('aggregates with imgId/gifUrl query when both are set', async () => {
      (PostModel.aggregate as jest.Mock).mockResolvedValue([mockPost]);
      const result = await postService.getPosts({ imgId: '1', gifUrl: 'url' } as any, 0, 10, { createdAt: -1 });
      expect(PostModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual([mockPost]);
    });

    it('aggregates with videoId query when set', async () => {
      (PostModel.aggregate as jest.Mock).mockResolvedValue([mockPost]);
      await postService.getPosts({ videoId: 'vid1' } as any, 0, 10, { createdAt: -1 });
      expect(PostModel.aggregate).toHaveBeenCalled();
    });

    it('aggregates with raw query otherwise', async () => {
      (PostModel.aggregate as jest.Mock).mockResolvedValue([mockPost]);
      await postService.getPosts({ privacy: 'Public' } as any, 0, 10, { createdAt: -1 });
      expect(PostModel.aggregate).toHaveBeenCalled();
    });
  });

  describe('postsCount', () => {
    it('returns total document count', async () => {
      (PostModel.find as jest.Mock).mockReturnValue({ countDocuments: jest.fn().mockResolvedValue(42) });
      const count = await postService.postsCount();
      expect(count).toBe(42);
    });
  });

  describe('deletePost', () => {
    it('deletes post and decrements user postsCount', async () => {
      (PostModel.deleteOne as jest.Mock).mockResolvedValue({});
      (UserModel.updateOne as jest.Mock).mockResolvedValue({});

      await postService.deletePost('post1', 'user1');

      expect(PostModel.deleteOne).toHaveBeenCalledWith({ _id: 'post1' });
      expect(UserModel.updateOne).toHaveBeenCalledWith({ _id: 'user1' }, { $inc: { postsCount: -1 } });
    });
  });

  describe('editPost', () => {
    it('calls PostModel.updateOne with $set of updated fields', async () => {
      (PostModel.updateOne as jest.Mock).mockResolvedValue({});
      const updated = { ...mockPost, post: 'Updated content', feelings: 'happy' };

      await postService.editPost('post1', updated);

      expect(PostModel.updateOne).toHaveBeenCalledWith(
        { _id: 'post1' },
        { $set: expect.objectContaining({ post: 'Updated content' }) }
      );
    });
  });
});
