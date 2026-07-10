import { chatWorker } from '@worker/chat.worker';
import { chatService } from '@service/db/chat.service';

jest.mock('@service/db/chat.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('ChatWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addChatMessageToDB', () => {
    it('calls chatService.addMessageToDB with job.data', async () => {
      const data = { senderId: 'u1', receiverId: 'u2', body: 'Hello' };
      const job = mockJob(data);
      (chatService.addMessageToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.addChatMessageToDB(job);

      expect(chatService.addMessageToDB).toHaveBeenCalledWith(data);
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const job = mockJob({});
      const err = new Error('DB error');
      (chatService.addMessageToDB as jest.Mock).mockRejectedValueOnce(err);

      await expect(chatWorker.addChatMessageToDB(job)).rejects.toThrow('DB error');
    });
  });

  describe('markMessageAsDeleted', () => {
    it('calls chatService.markMessageAsDeleted with messageId and type', async () => {
      const job = mockJob({ messageId: 'msg1', type: 'deleteForMe' });
      (chatService.markMessageAsDeleted as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.markMessageAsDeleted(job);

      expect(chatService.markMessageAsDeleted).toHaveBeenCalledWith('msg1', 'deleteForMe');
    });
  });

  describe('markMessagesAsReadInDB', () => {
    it('calls chatService.markMessagesAsRead with senderId and receiverId', async () => {
      const job = mockJob({ senderId: 'u1', receiverId: 'u2' });
      (chatService.markMessagesAsRead as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.markMessagesAsReadInDB(job);

      expect(chatService.markMessagesAsRead).toHaveBeenCalledWith('u1', 'u2');
    });
  });

  describe('updateMessageReaction', () => {
    it('calls chatService.updateMessageReaction with correct args', async () => {
      const job = mockJob({ messageId: 'msg1', senderName: 'Alice', reaction: '❤️', type: 'add' });
      (chatService.updateMessageReaction as jest.Mock).mockResolvedValueOnce(undefined);

      await chatWorker.updateMessageReaction(job);

      expect(chatService.updateMessageReaction).toHaveBeenCalledWith('msg1', 'Alice', '❤️', 'add');
    });
  });
});
