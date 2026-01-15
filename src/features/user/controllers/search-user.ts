import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { Helpers } from '@global/helpers/helpers';
import { userService } from '@service/db/user.service';
import { ISearchUser } from '@user/interfaces/user.interface';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('searchUser');

export class Search {
  public async user(req: Request, res: Response): Promise<void> {
    log.info({ query: req.params.query }, 'User search initiated');
    const regex = new RegExp(Helpers.escapeRegex(req.params.query), 'i');
    const users: ISearchUser[] = await userService.searchUsers(regex);
    log.info({ resultCount: users.length }, 'User search completed');
    res.status(HTTP_STATUS.OK).json({ message: 'Search results', search: users });
  }
}