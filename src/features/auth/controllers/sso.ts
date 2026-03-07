import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';

export class SSO {
  public async login(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    if (!token) throw new BadRequestError('Token required');

    const payload = JWT.verify(token, config.JWT_TOKEN!) as { username: string };

    const authUser = await authService.getAuthUserByUsername(payload.username);
    if (!authUser) throw new BadRequestError('User not found');

    const user = await userService.getUserByAuthId(`${authUser._id}`);

    req.session = { jwt: token };

    const userDocument: IUserDocument = {
      ...user,
      authId: authUser._id,
      username: authUser.username,
      email: authUser.email,
      avatarColor: authUser.avatarColor,
      uId: authUser.uId,
      createdAt: authUser.createdAt
    } as IUserDocument;

    res.status(HTTP_STATUS.OK).json({
      message: 'SSO login successful',
      user: userDocument,
      token
    });
  }
}

export const sso = new SSO();
