import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import Logger from 'bunyan';

const log: Logger = config.createLogger('authMiddleware');

export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      log.warn('No JWT token found in session');
      throw new NotAuthorizedError('Token is not valid.Please login again');
    }

    try {
      const payload: AuthPayload = JWT.verify(
        req.session?.jwt,
        config.JWT_TOKEN!,
      ) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid.');
    }
    next();
  }
  public checkAuthentication(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError(
        'User is not authenticated.Please login again',
      );
    }
    next();
  }
}
export const authMiddleware: AuthMiddleware = new AuthMiddleware();
