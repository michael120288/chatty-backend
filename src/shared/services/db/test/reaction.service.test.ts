import { reactionService } from '@service/db/reaction.service';
import { ReactionModel } from '@reaction/models/reaction.schema';
import { PostModel } from '@post/models/post.schema';
import { NotificationModel } from '@notification/models/notification.schema';
import { UserCache } from '@service/redis/user.cache';
import { socketIONotificationObject } from '@socket/notification';
import { emailQueue } from '@service/queues/email.queue';

jest.mock('@reaction/models/reaction.schema');
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
const reactionId1 = '507f1f77bcf86cd799439017';

const mockReactionJob = {
  postId: postId1,
  userTo: userId2,
  userFrom: userId1,
  username: 'Alice',
  type: 'like',
  previousReaction: 'love',
  reactionObject: { _id: 'r1', postId: postId1, type: 'like', username: 'Alice' },
};

describe('ReactionService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addReactionDataToDB', () => {
    it('calls replaceOne on ReactionModel, findOneAndUpdate on PostModel, and getUserFromCache', async () => {
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { reactions: false },
        username: 'Bob',
        email: 'bob@test.com',
      } as any);
      (ReactionModel.replaceOne as jest.Mock).mockResolvedValue({ _id: 'r1' });
      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ post: 'Hello', imgId: '', imgVersion: '', gifUrl: '' });

      await reactionService.addReactionDataToDB(mockReactionJob as any);

      expect(ReactionModel.replaceOne).toHaveBeenCalledWith(
        { postId: postId1, type: 'love', username: 'Alice' },
        expect.anything(),
        { upsert: true }
      );
      expect(PostModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: postId1 },
        expect.objectContaining({ $inc: expect.anything() }),
        { new: true }
      );
    });

    it('sends notification when reactions enabled and userFrom !== userTo', async () => {
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { reactions: true },
        username: 'Bob',
        email: 'bob@test.com',
      } as any);
      (ReactionModel.replaceOne as jest.Mock).mockResolvedValue({ _id: reactionId1 });
      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ post: 'Hello', imgId: '', imgVersion: '', gifUrl: '' });
      const insertNotification = jest.fn().mockResolvedValue({ _id: 'notif1' });
      (NotificationModel as unknown as jest.Mock).mockImplementation(() => ({ insertNotification }));

      await reactionService.addReactionDataToDB(mockReactionJob as any);

      expect(insertNotification).toHaveBeenCalled();
      expect(socketIONotificationObject.emit).toHaveBeenCalledWith('insert notification', expect.anything(), { userTo: userId2 });
      expect(emailQueue.addEmailJob).toHaveBeenCalledWith('reactionsEmail', expect.objectContaining({ receiverEmail: 'bob@test.com' }));
    });

    it('does not send notification when userFrom === userTo', async () => {
      jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue({
        notifications: { reactions: true },
        username: 'Alice',
        email: 'alice@test.com',
      } as any);
      (ReactionModel.replaceOne as jest.Mock).mockResolvedValue({ _id: 'r1' });
      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ post: 'Hello', imgId: '', imgVersion: '', gifUrl: '' });

      await reactionService.addReactionDataToDB({ ...mockReactionJob, userFrom: userId2 } as any);

      expect(socketIONotificationObject.emit).not.toHaveBeenCalled();
    });
  });

  describe('removeReactionDataFromDB', () => {
    it('deletes reaction and decrements post reaction count', async () => {
      (ReactionModel.deleteOne as jest.Mock).mockResolvedValue({});
      (PostModel.updateOne as jest.Mock).mockResolvedValue({});

      await reactionService.removeReactionDataFromDB(mockReactionJob as any);

      expect(ReactionModel.deleteOne).toHaveBeenCalledWith({ postId: postId1, type: 'love', username: 'Alice' });
      expect(PostModel.updateOne).toHaveBeenCalledWith(
        { _id: postId1 },
        expect.objectContaining({ $inc: expect.anything() }),
        { new: true }
      );
    });
  });

  describe('getPostReactions', () => {
    it('returns reactions array and count', async () => {
      const reactions = [{ type: 'like' }, { type: 'love' }];
      (ReactionModel.aggregate as jest.Mock).mockResolvedValue(reactions);
      const result = await reactionService.getPostReactions({ postId: postId1 } as any, { createdAt: -1 });
      expect(result).toEqual([reactions, 2]);
    });
  });

  describe('getSinglePostReactionByUsername', () => {
    it('returns reaction and count 1 when found', async () => {
      const reaction = { type: 'like', username: 'Alice' };
      (ReactionModel.aggregate as jest.Mock).mockResolvedValue([reaction]);
      const result = await reactionService.getSinglePostReactionByUsername(postId1, 'alice');
      expect(result).toEqual([reaction, 1]);
    });

    it('returns empty array when not found', async () => {
      (ReactionModel.aggregate as jest.Mock).mockResolvedValue([]);
      const result = await reactionService.getSinglePostReactionByUsername(postId1, 'alice');
      expect(result).toEqual([]);
    });
  });

  describe('getReactionsByUsername', () => {
    it('returns reactions for username', async () => {
      const reactions = [{ type: 'like', username: 'Alice' }];
      (ReactionModel.aggregate as jest.Mock).mockResolvedValue(reactions);
      const result = await reactionService.getReactionsByUsername('alice');
      expect(result).toEqual(reactions);
    });
  });
});
