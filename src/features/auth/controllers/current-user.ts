import { Request, Response } from 'express';
import { UserCache } from '@service/redis/user.cache';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('currentUser');
const userCache: UserCache = new UserCache();

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
    let isUser = false;
    let token = null;
    let user = null;
    log.debug({ currentUser: req.currentUser }, 'Current user from request');

    const cachedUser: IUserDocument = (await userCache.getUserFromCache(
      `${req.currentUser!.userId}`,
    )) as IUserDocument;
    log.debug({ cachedUser: !!cachedUser }, 'User found in cache');
    const existingUser: IUserDocument = cachedUser
      ? cachedUser
      : await userService.getUserById(`${req.currentUser!.userId}`);
    log.debug({ existingUser: !!existingUser }, 'User retrieved');
    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser, user });
  }
}
