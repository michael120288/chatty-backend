import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import { tokenBlocklistCache } from '@service/redis/token-blocklist.cache';

export class SSO {
  public async login(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    if (!token) throw new BadRequestError('Token required');

    let payload: { username: string; jti?: string };
    try {
      payload = JWT.verify(token, config.JWT_TOKEN!) as { username: string; jti?: string };
    } catch {
      // Malformed / expired / tampered token — return a clean 400 instead of a 500.
      throw new BadRequestError('Invalid or expired token');
    }

    if (payload.jti && (await tokenBlocklistCache.isTokenRevoked(payload.jti))) {
      throw new BadRequestError('Invalid or expired token');
    }

    const authUser = await authService.getAuthUserByUsername(payload.username);
    if (!authUser) throw new BadRequestError('User not found');

    const user = await userService.getUserByAuthId(`${authUser._id}`);

    const userJwt: string = JWT.sign(
      {
        userId: user._id,
        uId: authUser.uId,
        email: authUser.email,
        username: authUser.username,
        avatarColor: authUser.avatarColor,
        jti: randomUUID(),
      },
      config.JWT_TOKEN!,
      { expiresIn: '24h' }
    );
    req.session = { jwt: userJwt };

    const userDocument: IUserDocument = {
      ...user,
      authId: authUser._id,
      username: authUser.username,
      email: authUser.email,
      avatarColor: authUser.avatarColor,
      uId: authUser.uId,
      createdAt: authUser.createdAt
    } as IUserDocument;

    const { password: _pw, ...safeUser } = userDocument as typeof userDocument & { password?: string };

    res.status(HTTP_STATUS.OK).json({
      message: 'SSO login successful',
      user: safeUser,
      token: userJwt
    });
  }
}

export const sso = new SSO();
