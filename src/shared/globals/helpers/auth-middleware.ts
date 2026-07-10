import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { tokenBlocklistCache } from '@service/redis/token-blocklist.cache';

export class AuthMiddleware {
  public async verifyUser(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not valid.Please login again');
    }

    let payload: AuthPayload;
    try {
      payload = JWT.verify(
        req.session?.jwt,
        config.JWT_TOKEN!,
      ) as AuthPayload;
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
    if (payload.jti && (await tokenBlocklistCache.isTokenRevoked(payload.jti))) {
      throw new NotAuthorizedError('Token has been revoked. Please login again.');
    }
    req.currentUser = payload;
    next();
  }
  public async identifyUser(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (req.session?.jwt) {
      try {
        const payload = JWT.verify(req.session.jwt, config.JWT_TOKEN!) as AuthPayload;
        if (!payload.jti || !(await tokenBlocklistCache.isTokenRevoked(payload.jti))) {
          req.currentUser = payload;
        }
      } catch {
        // Invalid/expired token — leave req.currentUser unset.
        // Routes must apply checkAuthentication to enforce that a user is present.
      }
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
