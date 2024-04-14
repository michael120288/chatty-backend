import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { loginSchema } from '@auth/schemas/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import {
  IResetPasswordParams,
  IUserDocument,
} from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import { mailTransport } from '@service/emails/mail.transport';
import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password/forgot-password-templates';
import { emailQueue } from '@service/queues/email.queue';
import moment from 'moment';
import publicIP from 'ip';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
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
      },
      config.JWT_TOKEN!,
    );

    // await mailTransport.sendMail('mabelle.medhurst99@ethereal.email','Testing email','This is a test email')
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

    const templateParams: IResetPasswordParams = {
      username: existingUser.username,
      email: existingUser.email,
      ipaddress: publicIP.address(),
      date: moment().format('DD/MM/YYYY HH:mm'),
    };

    const resetLink = `${config.CLIENT_URL}/reset-password?token=123123123`;
    const template: string = forgotPasswordTemplate.passwordResetTemplate(
      existingUser.username,
      resetLink,
    );
    emailQueue.addEmailJob('forgotPasswordEmail', {
      template,
      receiverEmail: 'michael.sheptun@getMaxListeners.com',
      subject: 'Password reset confirmation',
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'User login successfully',
      user: userDocument,
      token: userJwt,
    });
  }
}
