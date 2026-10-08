import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { tokenBlocklistCache } from '@service/redis/token-blocklist.cache';

export class SignOut {
  public async update(req: Request, res: Response): Promise<void> {
    if (req.session?.jwt) {
      try {
        const { jti, exp } = JWT.verify(req.session.jwt, config.JWT_TOKEN!) as AuthPayload;
        if (jti && exp) {
          const ttlSeconds = exp - Math.floor(Date.now() / 1000);
          await tokenBlocklistCache.revokeToken(jti, ttlSeconds);
        }
      } catch {
        // Token already invalid/expired — nothing to revoke.
      }
    }

    req.session = null;
    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'User logout successfully', user: {}, token: '' });
  }
}
