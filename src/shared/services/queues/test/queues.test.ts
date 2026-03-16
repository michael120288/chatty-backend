import { BaseQueue } from '@service/queues/base.queue';
import { authQueue } from '@service/queues/auth.queue';
import { emailQueue } from '@service/queues/email.queue';
import { postQueue } from '@service/queues/post.queue';
import { commentQueue } from '@service/queues/comment.queue';
import { reactionQueue } from '@service/queues/reaction.queue';
import { followerQueue } from '@service/queues/follower.queue';
import { blockedUserQueue } from '@service/queues/blocked.queue';
import { notificationQueue } from '@service/queues/notification.queue';
import { imageQueue } from '@service/queues/image.queue';
import { chatQueue } from '@service/queues/chat.queue';
import { userQueue } from '@service/queues/user.queue';

jest.mock('@service/queues/base.queue');

describe('Queue Services', () => {
  let addJobSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    addJobSpy = jest.spyOn(BaseQueue.prototype as any, 'addJob').mockImplementation(() => {});
  });

  // ── AuthQueue ────────────────────────────────────────────────────────────

  describe('AuthQueue', () => {
    it('addAuthUserJob calls addJob with the given name and data', () => {
      const data = { value: 'authUserId' } as any;
      authQueue.addAuthUserJob('addAuthUserToDB', data);
      expect(addJobSpy).toHaveBeenCalledWith('addAuthUserToDB', data);
    });
  });

  // ── EmailQueue ───────────────────────────────────────────────────────────

  describe('EmailQueue', () => {
    it('addEmailJob calls addJob with the given name and data', () => {
      const data = { receiverEmail: 'user@example.com', subject: 'Test', template: '<p>Hi</p>' };
      emailQueue.addEmailJob('forgotPasswordEmail', data);
      expect(addJobSpy).toHaveBeenCalledWith('forgotPasswordEmail', data);
    });
  });

  // ── PostQueue ────────────────────────────────────────────────────────────

  describe('PostQueue', () => {
    it('addPostJob calls addJob with the given name and data', () => {
      const data = { key: 'userId', value: 'postData' } as any;
      postQueue.addPostJob('addPostToDB', data);
      expect(addJobSpy).toHaveBeenCalledWith('addPostToDB', data);
    });
  });

  // ── CommentQueue ─────────────────────────────────────────────────────────

  describe('CommentQueue', () => {
    it('addCommentJob calls addJob with the given name and data', () => {
      const data = { postId: 'p1', comment: 'Nice!' };
      commentQueue.addCommentJob('addCommentToDB', data);
      expect(addJobSpy).toHaveBeenCalledWith('addCommentToDB', data);
    });
  });

  // ── ReactionQueue ────────────────────────────────────────────────────────

  describe('ReactionQueue', () => {
    it('addReactionJob calls addJob with the given name and data', () => {
      const data = { postId: 'p1', type: 'like' };
      reactionQueue.addReactionJob('addReactionToDB', data as any);
      expect(addJobSpy).toHaveBeenCalledWith('addReactionToDB', data);
    });
  });

  // ── FollowerQueue ────────────────────────────────────────────────────────

  describe('FollowerQueue', () => {
    it('addFollowerJob calls addJob with the given name and data', () => {
      const data = { keyOne: 'u1', keyTwo: 'u2', username: 'Alice', followerDocumentId: 'doc1' };
      followerQueue.addFollowerJob('addFollowerToDB', data as any);
      expect(addJobSpy).toHaveBeenCalledWith('addFollowerToDB', data);
    });
  });

  // ── BlockedUserQueue ─────────────────────────────────────────────────────

  describe('BlockedUserQueue', () => {
    it('addBlockedUserJob calls addJob with the given name and data', () => {
      const data = { keyOne: 'u1', keyTwo: 'u2', type: 'block' };
      blockedUserQueue.addBlockedUserJob('addBlockedUserToDB', data as any);
      expect(addJobSpy).toHaveBeenCalledWith('addBlockedUserToDB', data);
    });
  });

  // ── NotificationQueue ────────────────────────────────────────────────────

  describe('NotificationQueue', () => {
    it('addNotificationJob calls addJob with the given name and data', () => {
      const data = { key: 'notif1' };
      notificationQueue.addNotificationJob('updateNotification', data as any);
      expect(addJobSpy).toHaveBeenCalledWith('updateNotification', data);
    });
  });

  // ── ImageQueue ───────────────────────────────────────────────────────────

  describe('ImageQueue', () => {
    it('addImageJob calls addJob with the given name and data', () => {
      const data = { key: 'userId', imgId: 'img1', imgVersion: 'v1', value: '' };
      imageQueue.addImageJob('addUserProfileImageToDB', data as any);
      expect(addJobSpy).toHaveBeenCalledWith('addUserProfileImageToDB', data);
    });
  });

  // ── ChatQueue ────────────────────────────────────────────────────────────

  describe('ChatQueue', () => {
    it('addChatJob calls addJob with the given name and data', () => {
      const data = { senderId: 'u1', receiverId: 'u2', body: 'Hello' };
      chatQueue.addChatJob('addChatMessageToDB', data as any);
      expect(addJobSpy).toHaveBeenCalledWith('addChatMessageToDB', data);
    });
  });

  // ── UserQueue ────────────────────────────────────────────────────────────

  describe('UserQueue', () => {
    it('addUserJob calls addJob with the given name and data', () => {
      const data = { value: 'userDataString' } as any;
      userQueue.addUserJob('addUserToDB', data);
      expect(addJobSpy).toHaveBeenCalledWith('addUserToDB', data);
    });
  });
});
