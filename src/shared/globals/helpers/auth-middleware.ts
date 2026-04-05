import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import { AuthPayload } from '@auth/interfaces/auth.interface';

export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not valid.Please login again');
    }

    try {
      const payload: AuthPayload = JWT.verify(
        req.session?.jwt,
        config.JWT_TOKEN!,
      ) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError) {
        throw new NotAuthorizedError('Token has expired. Please login again.');
      }
      if (error instanceof JWT.JsonWebTokenError) {
        throw new NotAuthorizedError('Token signature is invalid. Please login again.');
      }
      if (error instanceof JWT.NotBeforeError) {
        throw new NotAuthorizedError('Token is not yet valid. Please login again.');
      }
      throw new NotAuthorizedError('Token is invalid. Please login again.');
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
