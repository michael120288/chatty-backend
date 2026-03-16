import { config } from '@root/config';
import { chatService } from '@service/db/chat.service';
import { Job } from 'bull';
import Logger from 'bunyan';

const log: Logger = config.createLogger('chatWorker');

class ChatWorker {
  async addChatMessageToDB(job: Job): Promise<void> {
    await chatService.addMessageToDB(job.data);
    job.progress(100);
  }

  async markMessageAsDeleted(job: Job): Promise<void> {
    const { messageId, type } = job.data;
    await chatService.markMessageAsDeleted(messageId, type);
    job.progress(100);
  }

  async markMessagesAsReadInDB(job: Job): Promise<void> {
    const { senderId, receiverId } = job.data;
    await chatService.markMessagesAsRead(senderId, receiverId);
    job.progress(100);
  }

  async updateMessageReaction(job: Job): Promise<void> {
    const { messageId, senderName, reaction, type } = job.data;
    await chatService.updateMessageReaction(messageId, senderName, reaction, type);
    job.progress(100);
  }
}

export const chatWorker: ChatWorker = new ChatWorker();
