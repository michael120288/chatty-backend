import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { loginSchema } from '@auth/schemas/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import { UserCache } from '@service/redis/user.cache';

const userCache: UserCache = new UserCache();

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const testSecret = req.headers['x-test-secret'];
    if (testSecret !== undefined) {
      const lower = req.body.username?.toLowerCase() ?? '';
      const isTestPrefix = ['vitest', 'pytest', 'pw_'].some((p) => lower.startsWith(p));
      if (testSecret !== config.TEST_CLEANUP_SECRET || !isTestPrefix) {
        res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Forbidden: invalid test secret or non-test username' });
        return;
      }
    }

    const { username, password } = req.body;
    const existingUser: IAuthDocument =
      await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean =
      await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const user: IUserDocument = await userService.getUserByAuthId(
      `${existingUser._id}`,
    );
    const userJwt: string = JWT.sign(
      {
        userId: user._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor,
        jti: randomUUID(),
      },
      config.JWT_TOKEN!,
      { expiresIn: '24h' },
    );

    req.session = { jwt: userJwt };
    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser!._id,
      username: existingUser!.username,
      email: existingUser!.email,
      avatarColor: existingUser!.avatarColor,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt
    } as IUserDocument;

    // Refresh Redis cache on login so page-refresh works even after cache expiry
    userCache.saveUserToCache(`${user._id}`, `${existingUser.uId}`, userDocument).catch((err) => {
      console.warn('Cache refresh on login failed:', err?.message);
    });

    const { password: _pw, ...safeUser } = userDocument as typeof userDocument & { password?: string };

    res.status(HTTP_STATUS.OK).json({
      message: 'User login successfully',
      user: safeUser,
      token: userJwt,
    });
  }
}
