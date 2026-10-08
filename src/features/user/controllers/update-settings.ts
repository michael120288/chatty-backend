import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { UserCache } from '@service/redis/user.cache';
import { userQueue } from '@service/queues/user.queue';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { notificationSettingsSchema } from '@user/schemes/info';
import { IUserDocument } from '@user/interfaces/user.interface';

const userCache: UserCache = new UserCache();

const DEFAULT_NOTIFICATIONS = { messages: true, reactions: true, comments: true, follows: true };

export class UpdateSettings {
  @joiValidation(notificationSettingsSchema)
  public async notification(req: Request, res: Response): Promise<void> {
    const userId = `${req.currentUser!.userId}`;

    // Merge the partial update onto the user's existing notification settings so a
    // partial PUT (e.g. { reactions: false }) does not wipe the other flags.
    const cachedUser: IUserDocument | null = (await userCache.getUserFromCache(userId)) as IUserDocument | null;
    const current = (cachedUser?.notifications as Record<string, boolean> | undefined) ?? DEFAULT_NOTIFICATIONS;
    const merged = { ...DEFAULT_NOTIFICATIONS, ...current, ...req.body };

    await userCache.updateSingleUserItemInCache(userId, 'notifications', merged);
    userQueue.addUserJob('updateNotificationSettings', {
      key: userId,
      value: merged
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Notification settings updated successfully', settings: merged });
  }
}