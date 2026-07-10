import { commentService } from '@service/db/comment.service';
import { CommentsModel } from '@comment/models/comment.schema';
import { PostModel } from '@post/models/post.schema';
import { NotificationModel } from '@notification/models/notification.schema';
import { UserCache } from '@service/redis/user.cache';
import { socketIONotificationObject } from '@socket/notification';
import { emailQueue } from '@service/queues/email.queue';

jest.mock('@comment/models/comment.schema');
jest.mock('@post/models/post.schema');
jest.mock('@notification/models/notification.schema');
jest.mock('@service/redis/user.cache');
jest.mock('@socket/notification', () => ({ socketIONotificationObject: { emit: jest.fn() } }));
jest.mock('@service/emails/templates/notifications/notification-template', () => ({
  notificationTemplate: { notificationMessageTemplate: jest.fn().mockReturnValue('<html/>') }
}));
jest.mock('@service/queues/email.queue', () => ({ emailQueue: { addEmailJob: jest.fn() } }));
jest.mock('@service/queues/base.queue');

const userId1 = '507f1f77bcf86cd799439011';
const userId2 = '507f1f77bcf86cd799439012';
const postId1 = '507f1f77bcf86cd799439013';
const commentId1 = '507f1f77bcf86cd799439014';

const mockComment = { _id: commentId1, comment: 'Nice post', username: 'Alice' };
const mockPost = { _id: postId1, post: 'hello', imgId: 'img1', imgVersion: 'v1', gifUrl: '' };

describe('CommentService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addCommentToDB', () => {
    const baseData = {
      postId: postId1,
      userTo: userId2,
      userFrom: userId1,
      username: 'Alice',
      comment: mockComment as any,
    };

    it('creates comment, updates post count, and gets user from cache', async () => {
      (CommentsModel.create as jest.Mock).mockResolvedValue(mockComment);
      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockPost);
      const getUserFromCache = jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { comments: false },
        username: 'Bob',
        email: 'bob@test.com',
      } as any);

      await commentService.addCommentToDB(baseData);

      expect(CommentsModel.create).toHaveBeenCalledWith(baseData.comment);
      expect(PostModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: postId1 },
        { $inc: { commentsCount: 1 } },
        { new: true }
      );
      expect(getUserFromCache).toHaveBeenCalledWith(userId2);
    });

    it('sends notification when comments enabled and userFrom !== userTo', async () => {
      (CommentsModel.create as jest.Mock).mockResolvedValue({ ...mockComment, _id: commentId1 });
      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockPost);
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { comments: true },
        username: 'Bob',
        email: 'bob@test.com',
      } as any);
      const insertNotification = jest.fn().mockResolvedValue({ _id: 'notif1' });
      (NotificationModel as unknown as jest.Mock).mockImplementation(() => ({ insertNotification }));

      await commentService.addCommentToDB(baseData);

      expect(insertNotification).toHaveBeenCalled();
      expect(socketIONotificationObject.emit).toHaveBeenCalledWith('insert notification', expect.anything(), { userTo: userId2 });
      expect(emailQueue.addEmailJob).toHaveBeenCalledWith('commentsEmail', expect.objectContaining({ receiverEmail: 'bob@test.com' }));
    });

    it('does not send notification when userFrom === userTo', async () => {
      (CommentsModel.create as jest.Mock).mockResolvedValue(mockComment);
      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockPost);
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { comments: true },
        username: 'Alice',
        email: 'alice@test.com',
      } as any);

      await commentService.addCommentToDB({ ...baseData, userFrom: userId2 });

      expect(socketIONotificationObject.emit).not.toHaveBeenCalled();
      expect(emailQueue.addEmailJob).not.toHaveBeenCalled();
    });
  });

  describe('getPostComments', () => {
    it('returns aggregated comments', async () => {
      (CommentsModel.aggregate as jest.Mock).mockResolvedValue([mockComment]);
      const result = await commentService.getPostComments({ postId: postId1 } as any, { createdAt: -1 });
      expect(CommentsModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual([mockComment]);
    });
  });

  describe('getPostCommentNames', () => {
    it('returns aggregated comment names', async () => {
      const names = [{ names: ['Alice'], count: 1 }];
      (CommentsModel.aggregate as jest.Mock).mockResolvedValue(names);
      const result = await commentService.getPostCommentNames({ postId: postId1 } as any, { createdAt: -1 });
      expect(result).toEqual(names);
    });
  });

  describe('updateCommentInDB', () => {
    it('calls CommentsModel.updateOne with commentId and username', async () => {
      (CommentsModel.updateOne as jest.Mock).mockResolvedValue({});
      await commentService.updateCommentInDB(commentId1, 'Updated text', 'Alice');
      expect(CommentsModel.updateOne).toHaveBeenCalledWith(
        { _id: commentId1, username: 'Alice' },
        { $set: { comment: 'Updated text' } }
      );
    });
  });

  describe('deleteCommentFromDB', () => {
    it('deletes comment and decrements post commentsCount', async () => {
      (CommentsModel.deleteOne as jest.Mock).mockResolvedValue({});
      (PostModel.updateOne as jest.Mock).mockResolvedValue({});
      await commentService.deleteCommentFromDB(postId1, commentId1, 'Alice');
      expect(CommentsModel.deleteOne).toHaveBeenCalledWith({ _id: commentId1, username: 'Alice' });
      expect(PostModel.updateOne).toHaveBeenCalledWith({ _id: postId1 }, { $inc: { commentsCount: -1 } });
    });
  });
});
