import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { AuthModel } from '@auth/models/auth.schema';
import { UserModel } from '@user/models/user.schema';
import { config } from '@root/config';
import { NotFoundError, BadRequestError } from '@global/helpers/error-handler';
import Logger from 'bunyan';

const log: Logger = config.createLogger('test-cleanup');

const TEST_USERNAME_PREFIX = 'vitest';

// Hardcoded value — no env var needed.
// Anyone calling this endpoint must send: x-test-secret: chatty-test-cleanup-2026
// The vitest username prefix is the real safety guard against accidental deletions.
const CLEANUP_HEADER_VALUE = 'chatty-test-cleanup-2026';

class TestCleanup {
  public async deleteUser(req: Request, res: Response): Promise<void> {
    const secret = req.headers['x-test-secret'];

    if (!secret || secret !== CLEANUP_HEADER_VALUE) {
      log.warn(`Unauthorized test cleanup attempt from IP: ${req.ip}`);
      res.status(HTTP_STATUS.FORBIDDEN).json({
        message: 'Forbidden: invalid test secret'
      });
      return;
    }

    const { authId } = req.params;

    // Extra safety: only allow deletion of test users (username must start with vitest prefix)
    const authUser = await AuthModel.findById(authId).exec();
    if (!authUser) {
      throw new NotFoundError(`Auth user with id ${authId} not found`);
    }

    const username: string = authUser.username?.toLowerCase() ?? '';
    if (!username.startsWith(TEST_USERNAME_PREFIX)) {
      log.warn(`Blocked attempt to delete non-test user: ${authUser.username}`);
      throw new BadRequestError(
        `Safety check failed: user "${authUser.username}" does not appear to be a test user. ` +
        `Username must start with "${TEST_USERNAME_PREFIX}".`
      );
    }

    // Delete from both collections
    await UserModel.deleteOne({ authId }).exec();
    await AuthModel.deleteOne({ _id: authId }).exec();

    log.info(`Test user deleted — authId: ${authId}, username: ${authUser.username}`);

    res.status(HTTP_STATUS.OK).json({
      message: 'Test user deleted successfully',
      deletedAuthId: authId,
      deletedUsername: authUser.username
    });
  }
}

export const testCleanup: TestCleanup = new TestCleanup();
