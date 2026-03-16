import { chatWorker } from '@worker/chat.worker';
import { chatService } from '@service/db/chat.service';

jest.mock('@service/db/chat.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('ChatWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addChatMessageToDB', () => {
    it('calls chatService.addMessageToDB with job.data', async () => {
      const done = jest.fn();
      const data = { senderId: 'u1', receiverId: 'u2', body: 'Hello' };
      const job = mockJob(data);
      (chatService.addMessageToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.addChatMessageToDB(job, done);

      expect(chatService.addMessageToDB).toHaveBeenCalledWith(data);
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(done).toHaveBeenCalledWith(null, data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({});
      const err = new Error('DB error');
      (chatService.addMessageToDB as jest.Mock).mockRejectedValueOnce(err);

      await chatWorker.addChatMessageToDB(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });

  describe('markMessageAsDeleted', () => {
    it('calls chatService.markMessageAsDeleted with messageId and type', async () => {
      const done = jest.fn();
      const job = mockJob({ messageId: 'msg1', type: 'deleteForMe' });
      (chatService.markMessageAsDeleted as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.markMessageAsDeleted(job, done);

      expect(chatService.markMessageAsDeleted).toHaveBeenCalledWith('msg1', 'deleteForMe');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('markMessagesAsReadInDB', () => {
    it('calls chatService.markMessagesAsRead with senderId and receiverId', async () => {
      const done = jest.fn();
      const job = mockJob({ senderId: 'u1', receiverId: 'u2' });
      (chatService.markMessagesAsRead as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.markMessagesAsReadInDB(job, done);

      expect(chatService.markMessagesAsRead).toHaveBeenCalledWith('u1', 'u2');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('updateMessageReaction', () => {
    it('calls chatService.updateMessageReaction with correct args', async () => {
      const done = jest.fn();
      const job = mockJob({ messageId: 'msg1', senderName: 'Alice', reaction: '❤️', type: 'add' });
      (chatService.updateMessageReaction as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.updateMessageReaction(job, done);

      expect(chatService.updateMessageReaction).toHaveBeenCalledWith('msg1', 'Alice', '❤️', 'add');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });
});
