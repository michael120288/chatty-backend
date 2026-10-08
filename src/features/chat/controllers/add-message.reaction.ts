import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';
import { MessageCache } from '@service/redis/message.cache';
import { IMessageData } from '@chat/interfaces/chat.interface';
import { socketIOChatObject } from '@socket/chat';
import { chatQueue } from '@service/queues/chat.queue';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { messageReactionSchema } from '@chat/schemes/chat';
import { BadRequestError } from '@global/helpers/error-handler';

const messageCache: MessageCache = new MessageCache();

export class Message {
  @joiValidation(messageReactionSchema)
  public async reaction(req: Request, res: Response): Promise<void> {
    const { conversationId, messageId, reaction, type } = req.body;

    // Guard invalid ObjectIds so a bad messageId returns 400, not a 500 crash.
    if (!mongoose.isValidObjectId(messageId)) {
      throw new BadRequestError('Invalid messageId');
    }
    const updatedMessage: IMessageData = await messageCache.updateMessageReaction(
      `${conversationId}`,
      `${messageId}`,
      `${reaction}`,
      `${req.currentUser!.username}`,
      type
    );
    socketIOChatObject.emit('message reaction', updatedMessage);
    chatQueue.addChatJob('updateMessageReaction', {
      messageId: new mongoose.Types.ObjectId(messageId as string),
      senderName: req.currentUser!.username,
      reaction,
      type
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Message reaction added' });
  }
}