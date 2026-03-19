import { chatService } from '@service/db/chat.service';
import { MessageModel } from '@chat/models/chat.schema';
import { ConversationModel } from '@chat/models/conversation.schema';
import mongoose from 'mongoose';

jest.mock('@chat/models/chat.schema');
jest.mock('@chat/models/conversation.schema');

const SENDER_ID = new mongoose.Types.ObjectId('60263f14648fed5246e322d9');
const RECEIVER_ID = new mongoose.Types.ObjectId('60263f14648fed5246e322d8');
const CONVERSATION_ID = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011');
const MESSAGE_ID = new mongoose.Types.ObjectId('507f1f77bcf86cd799439012');

const mockMessageData = {
  _id: MESSAGE_ID,
  conversationId: CONVERSATION_ID,
  senderId: SENDER_ID,
  receiverId: RECEIVER_ID,
  senderUsername: 'Manny',
  receiverUsername: 'Danny',
  senderAvatarColor: '#9c27b0',
  receiverAvatarColor: '#2196f3',
  senderProfilePicture: '',
  receiverProfilePicture: '',
  body: 'Hello!',
  isRead: false,
  gifUrl: '',
  selectedImage: '',
  reaction: [],
  createdAt: new Date()
};

describe('ChatService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addMessageToDB', () => {
    it('should create a new conversation if one does not exist', async () => {
      (ConversationModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
      (ConversationModel.create as jest.Mock).mockResolvedValue({});
      (MessageModel.create as jest.Mock).mockResolvedValue(mockMessageData);

      await chatService.addMessageToDB(mockMessageData as any);
      expect(ConversationModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: CONVERSATION_ID,
          senderId: SENDER_ID,
          receiverId: RECEIVER_ID
        })
      );
      expect(MessageModel.create).toHaveBeenCalled();
    });

    it('should not create a new conversation if one already exists', async () => {
      (ConversationModel.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ _id: CONVERSATION_ID }])
      });
      (MessageModel.create as jest.Mock).mockResolvedValue(mockMessageData);

      await chatService.addMessageToDB(mockMessageData as any);
      expect(ConversationModel.create).not.toHaveBeenCalled();
      expect(MessageModel.create).toHaveBeenCalled();
    });
  });

  describe('getUserConversationList', () => {
    it('should aggregate messages grouped by conversation', async () => {
      const mockAggregate = jest.fn().mockResolvedValue([mockMessageData]);
      (MessageModel.aggregate as jest.Mock) = mockAggregate;

      const result = await chatService.getUserConversationList(SENDER_ID);
      expect(mockAggregate).toHaveBeenCalled();
      expect(result).toEqual([mockMessageData]);
    });
  });

  describe('getMessages', () => {
    it('should aggregate messages between two users', async () => {
      const mockAggregate = jest.fn().mockResolvedValue([mockMessageData]);
      (MessageModel.aggregate as jest.Mock) = mockAggregate;

      const result = await chatService.getMessages(SENDER_ID, RECEIVER_ID, { createdAt: 1 });
      expect(mockAggregate).toHaveBeenCalled();
      expect(result).toEqual([mockMessageData]);
    });
  });

  describe('markMessageAsDeleted', () => {
    it('should set deleteForMe flag when type is deleteForMe', async () => {
      (MessageModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      await chatService.markMessageAsDeleted(MESSAGE_ID.toString(), 'deleteForMe');
      expect(MessageModel.updateOne).toHaveBeenCalledWith(
        { _id: MESSAGE_ID.toString() },
        { $set: { deleteForMe: true } }
      );
    });

    it('should set both deleteForMe and deleteForEveryone when type is other', async () => {
      (MessageModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      await chatService.markMessageAsDeleted(MESSAGE_ID.toString(), 'deleteForEveryone');
      expect(MessageModel.updateOne).toHaveBeenCalledWith(
        { _id: MESSAGE_ID.toString() },
        { $set: { deleteForMe: true, deleteForEveryone: true } }
      );
    });
  });

  describe('markMessagesAsRead', () => {
    it('should update unread messages to read', async () => {
      (MessageModel.updateMany as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      await chatService.markMessagesAsRead(SENDER_ID, RECEIVER_ID);
      expect(MessageModel.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ $or: expect.any(Array) }),
        { $set: { isRead: true } }
      );
    });
  });

  describe('updateMessageReaction', () => {
    it('should push reaction when type is add', async () => {
      (MessageModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      await chatService.updateMessageReaction(MESSAGE_ID, 'Manny', 'like', 'add');
      expect(MessageModel.updateOne).toHaveBeenCalledWith(
        { _id: MESSAGE_ID },
        { $push: { reaction: { senderName: 'Manny', type: 'like' } } }
      );
    });

    it('should pull reaction when type is remove', async () => {
      (MessageModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      await chatService.updateMessageReaction(MESSAGE_ID, 'Manny', 'like', 'remove');
      expect(MessageModel.updateOne).toHaveBeenCalledWith(
        { _id: MESSAGE_ID },
        { $pull: { reaction: { senderName: 'Manny' } } }
      );
    });
  });
});
