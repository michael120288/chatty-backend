/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageCache } from '@service/redis/message.cache';

jest.mock('@service/redis/base.cache');

const SENDER_ID = '60263f14648fed5246e322d9';
const RECEIVER_ID = '60263f14648fed5246e322d8';
const CONVERSATION_ID = '507f1f77bcf86cd799439011';
const MESSAGE_ID = '507f1f77bcf86cd799439012';

const mockMessage = {
  _id: MESSAGE_ID,
  conversationId: CONVERSATION_ID,
  senderId: SENDER_ID,
  receiverId: RECEIVER_ID,
  senderUsername: 'Manny',
  receiverUsername: 'Danny',
  body: 'Hello!',
  isRead: false,
  reaction: [],
  deleteForMe: false,
  deleteForEveryone: false,
  createdAt: new Date()
};

const mockClient = {
  isOpen: true,
  connect: jest.fn(),
  LRANGE: jest.fn(),
  RPUSH: jest.fn(),
  LSET: jest.fn(),
  LINDEX: jest.fn(),
  LREM: jest.fn()
};

describe('MessageCache', () => {
  let messageCache: MessageCache;

  beforeEach(() => {
    messageCache = new MessageCache();
    (messageCache as any).client = mockClient;
    jest.clearAllMocks();
  });

  describe('addChatListToCache', () => {
    it('should push new receiver to chat list when list is empty', async () => {
      mockClient.LRANGE.mockResolvedValue([]);

      await messageCache.addChatListToCache(SENDER_ID, RECEIVER_ID, CONVERSATION_ID);
      expect(mockClient.RPUSH).toHaveBeenCalledWith(
        `chatList:${SENDER_ID}`,
        JSON.stringify({ receiverId: RECEIVER_ID, conversationId: CONVERSATION_ID })
      );
    });

    it('should not push duplicate receiver to chat list', async () => {
      const existingEntry = JSON.stringify({ receiverId: RECEIVER_ID, conversationId: CONVERSATION_ID });
      mockClient.LRANGE.mockResolvedValue([existingEntry]);

      await messageCache.addChatListToCache(SENDER_ID, RECEIVER_ID, CONVERSATION_ID);
      expect(mockClient.RPUSH).not.toHaveBeenCalled();
    });
  });

  describe('addChatMessageToCache', () => {
    it('should RPUSH message to conversation list', async () => {
      await messageCache.addChatMessageToCache(CONVERSATION_ID, mockMessage as any);
      expect(mockClient.RPUSH).toHaveBeenCalledWith(
        `messages:${CONVERSATION_ID}`,
        JSON.stringify(mockMessage)
      );
    });
  });

  describe('addChatUsersToCache', () => {
    it('should add user pair when not already in list', async () => {
      const chatUsers = { userOne: SENDER_ID, userTwo: RECEIVER_ID };
      mockClient.LRANGE.mockResolvedValue([]);

      await messageCache.addChatUsersToCache(chatUsers as any);
      expect(mockClient.RPUSH).toHaveBeenCalledWith('chatUsers', JSON.stringify(chatUsers));
    });

    it('should not add duplicate user pair', async () => {
      const chatUsers = { userOne: SENDER_ID, userTwo: RECEIVER_ID };
      mockClient.LRANGE.mockResolvedValue([JSON.stringify(chatUsers)]);

      await messageCache.addChatUsersToCache(chatUsers as any);
      expect(mockClient.RPUSH).not.toHaveBeenCalled();
    });
  });

  describe('markMessageAsDeleted', () => {
    it('should set deleteForMe when type is deleteForMe', async () => {
      const chatListEntry = JSON.stringify({ receiverId: RECEIVER_ID, conversationId: CONVERSATION_ID });
      const messageEntry = JSON.stringify({ ...mockMessage, _id: MESSAGE_ID });
      mockClient.LRANGE.mockResolvedValueOnce([chatListEntry]).mockResolvedValueOnce([messageEntry]);
      mockClient.LSET.mockResolvedValue('OK');
      mockClient.LINDEX.mockResolvedValue(JSON.stringify({ ...mockMessage, deleteForMe: true }));

      const result = await messageCache.markMessageAsDeleted(SENDER_ID, RECEIVER_ID, MESSAGE_ID, 'deleteForMe');
      expect(mockClient.LSET).toHaveBeenCalled();
      expect(result.deleteForMe).toBe(true);
      expect(result.deleteForEveryone).toBeFalsy();
    });

    it('should set both flags when type is deleteForEveryone', async () => {
      const chatListEntry = JSON.stringify({ receiverId: RECEIVER_ID, conversationId: CONVERSATION_ID });
      const messageEntry = JSON.stringify({ ...mockMessage, _id: MESSAGE_ID });
      mockClient.LRANGE.mockResolvedValueOnce([chatListEntry]).mockResolvedValueOnce([messageEntry]);
      mockClient.LSET.mockResolvedValue('OK');
      mockClient.LINDEX.mockResolvedValue(
        JSON.stringify({ ...mockMessage, deleteForMe: true, deleteForEveryone: true })
      );

      const result = await messageCache.markMessageAsDeleted(SENDER_ID, RECEIVER_ID, MESSAGE_ID, 'deleteForEveryone');
      expect(result.deleteForMe).toBe(true);
      expect(result.deleteForEveryone).toBe(true);
    });
  });

  describe('updateMessageReaction', () => {
    it('should add reaction when type is add', async () => {
      const messageWithReaction = { ...mockMessage, reaction: [] };
      mockClient.LRANGE.mockResolvedValue([JSON.stringify(messageWithReaction)]);
      mockClient.LINDEX.mockResolvedValue(
        JSON.stringify({ ...messageWithReaction, reaction: [{ senderName: 'Manny', type: 'like' }] })
      );
      mockClient.LSET.mockResolvedValue('OK');

      const result = await messageCache.updateMessageReaction(
        CONVERSATION_ID, MESSAGE_ID, 'like', 'Manny', 'add'
      );
      expect(mockClient.LSET).toHaveBeenCalled();
      expect(result.reaction).toEqual([{ senderName: 'Manny', type: 'like' }]);
    });

    it('should remove reaction when type is remove', async () => {
      const messageWithReaction = {
        ...mockMessage,
        reaction: [{ senderName: 'Manny', type: 'like' }]
      };
      mockClient.LRANGE.mockResolvedValue([JSON.stringify(messageWithReaction)]);
      mockClient.LINDEX.mockResolvedValue(JSON.stringify({ ...mockMessage, reaction: [] }));
      mockClient.LSET.mockResolvedValue('OK');

      const result = await messageCache.updateMessageReaction(
        CONVERSATION_ID, MESSAGE_ID, 'like', 'Manny', 'remove'
      );
      expect(result.reaction).toEqual([]);
    });
  });
});
