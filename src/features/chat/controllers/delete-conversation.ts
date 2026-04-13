import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';
import { MessageCache } from '@service/redis/message.cache';
import { chatService } from '@service/db/chat.service';

const messageCache: MessageCache = new MessageCache();

export class DeleteConversation {
  public async deleteConversation(req: Request, res: Response): Promise<void> {
    const { receiverId } = req.params;
    const senderId = req.currentUser!.userId;

    await messageCache.removeConversationFromCache(senderId, receiverId);
    await chatService.deleteConversation(
      new mongoose.Types.ObjectId(senderId),
      new mongoose.Types.ObjectId(receiverId)
    );

    res.status(HTTP_STATUS.OK).json({ message: 'Conversation deleted' });
  }
}
