import { ObjectId } from 'mongodb';
import { randomUUID } from 'node:crypto';
import { Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemas/signup';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { Helpers } from '@global/helpers/helpers';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudinary-upload';
import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserCache } from '@service/redis/user.cache';
import JWT from 'jsonwebtoken';
import { userQueue } from '@service/queues/user.queue';
import { config } from '@root/config';
import { BadRequestError } from '@global/helpers/error-handler';
import { recordCvcEffect } from '@service/db/cvc-trace';
import Logger from 'bunyan';

const log: Logger = config.createLogger('signup');
const userCache: UserCache = new UserCache();

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const testSecret = req.headers['x-test-secret'];
    if (testSecret !== undefined) {
      const lower = req.body.username?.toLowerCase() ?? '';
      const isTestPrefix = ['vitest', 'pytest', 'pw_'].some((p) => lower.startsWith(p));
      if (testSecret !== config.TEST_CLEANUP_SECRET || !isTestPrefix) {
        res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Forbidden: invalid test secret or non-test username' });
        return;
      }
    }

    // CVC prototype instrumentation (see /cvc-prototype). Only honored once
    // the test-secret check above has already passed — a real caller never
    // reaches here with these headers doing anything, since testSecret is
    // undefined and cvcTestId stays undefined below.
    const cvcTestId: string | undefined =
      testSecret !== undefined ? (req.headers['x-cvc-test-id'] as string | undefined) : undefined;
    const cvcSuppress = new Set(
      (cvcTestId && (req.headers['x-cvc-suppress'] as string | undefined)
        ? (req.headers['x-cvc-suppress'] as string).split(',')
        : []
      ).map((s) => s.trim()).filter(Boolean)
    );

    const { username, email, password, avatarColor, avatarImage } = req.body;

    log.info(`Signup attempt for username: ${username}`);

    const duplicateCheckSuppressed = cvcSuppress.has('rule.duplicate-check');
    if (cvcTestId) await recordCvcEffect(cvcTestId, 'rule.duplicate-check', { username, email }, duplicateCheckSuppressed);
    const checkIfUserExist: IAuthDocument | null = duplicateCheckSuppressed
      ? null
      : await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      log.warn(`Signup failed: User already exists - username: ${username}`);
      throw new BadRequestError('User already exists. Username or email is already taken.');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const authData: IAuthDocument = SignUp.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor,
    });

    log.info(`Uploading avatar image for user: ${username}`);
    const result: UploadApiResponse = (await uploads(
      avatarImage,
      `${userObjectId}`,
      true,
      true,
    )) as UploadApiResponse;

    if (!result?.public_id) {
      log.error(`Cloudinary upload failed for user: ${username}. Result: ${JSON.stringify(result)}`);
      throw new BadRequestError(`File upload failed. Please check your image and try again.`);
    }

    log.info(`Avatar uploaded successfully for user: ${username}, public_id: ${result.public_id}`);

    // Add to redis cache
    const userDataForCache: IUserDocument = SignUp.prototype.userData(
      authData,
      userObjectId,
    );
    userDataForCache.profilePicture = `https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;
    const cacheSuppressed = cvcSuppress.has('cache.write.user');
    if (cvcTestId) await recordCvcEffect(cvcTestId, 'cache.write.user', { userId: `${userObjectId}` }, cacheSuppressed);
    if (!cacheSuppressed) {
      await userCache.saveUserToCache(`${userObjectId}`, uId, userDataForCache);
    }

    // Auth document is written synchronously (not queued) because /signin
    // queries this collection directly, with no Redis cache in front of it —
    // an async write here raced against an immediate signin, intermittently
    // returning "Invalid credentials" for a real, just-created account.
    const authWriteSuppressed = cvcSuppress.has('db.write.auth');
    if (cvcTestId) await recordCvcEffect(cvcTestId, 'db.write.auth', { authId: `${authObjectId}` }, authWriteSuppressed);
    if (!authWriteSuppressed) {
      await authService.createAuthUser(authData);
    }
    // The User profile document can stay queued: it's already synchronously
    // cached in Redis above (saveUserToCache), and every read path that needs
    // it (currentuser, profile, etc.) checks that cache before falling back
    // to Mongo, so there's no equivalent immediate-read race for this one.
    const queueSuppressed = cvcSuppress.has('queue.publish.user');
    const userWriteSuppressed = cvcSuppress.has('db.write.user');
    if (cvcTestId) await recordCvcEffect(cvcTestId, 'queue.publish.user', { userId: `${userObjectId}` }, queueSuppressed);
    if (!queueSuppressed) {
      userQueue.addUserJob('addUserToDB', {
        value: userDataForCache,
        cvcTestId,
        cvcSuppressUserWrite: userWriteSuppressed
      });
    }

    const userJwt: string = SignUp.prototype.signToken(authData, userObjectId);
    req.session = { jwt: userJwt };

    log.info(`User created successfully: ${username}`);

    const { password: _pw, ...safeUser } = userDataForCache as typeof userDataForCache & { password?: string };

    res
      .status(HTTP_STATUS.CREATED)
      .json({
        message: 'User created successfully',
        user: safeUser,
        token: userJwt,
      });
  }

  private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        uId: data.uId,
        email: data.email,
        username: data.username,
        avatarColor: data.avatarColor,
        jti: randomUUID(),
      },
      config.JWT_TOKEN!,
      { expiresIn: '24h' }
    );
  }

  private signupData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      password,
      avatarColor,
      createdAt: new Date(),
    } as IAuthDocument;
  }

  private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email,
      password,
      avatarColor,
      profilePicture: '',
      blocked: [],
      blockedBy: [],
      work: '',
      location: '',
      school: '',
      quote: '',
      bgImageVersion: '',
      bgImageId: '',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      notifications: {
        messages: true,
        reactions: true,
        comments: true,
        follows: true,
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
      },
    } as unknown as IUserDocument;
  }
}
