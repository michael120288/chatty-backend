import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { MessageCache } from '@service/redis/message.cache';
import { chatService } from '@service/db/chat.service';

const messageCache: MessageCache = new MessageCache();

export class DeleteConversation {
  public async removeFromList(req: Request, res: Response): Promise<void> {
    const { receiverId } = req.params;
    const userId = `${req.currentUser!.userId}`;
    await messageCache.removeChatListEntryFromCache(userId, receiverId);
    await chatService.markConversationAsDeleted(userId, receiverId);
    res.status(HTTP_STATUS.OK).json({ message: 'Conversation removed' });
  }
}
