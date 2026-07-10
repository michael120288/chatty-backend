import { Request, Response } from 'express';
import { testCleanup } from '@auth/controllers/test-cleanup';
import { AuthModel } from '@auth/models/auth.schema';
import { UserModel } from '@user/models/user.schema';
import { UserCache } from '@service/redis/user.cache';
import { authMockRequest, authMockResponse } from '@root/mocks/auth.mock';
import { NotFoundError, BadRequestError } from '@global/helpers/error-handler';

jest.mock('@auth/models/auth.schema');
jest.mock('@user/models/user.schema');
jest.mock('@service/redis/user.cache');

const AUTH_ID = '60263f14648fed5246e322d3';
const USER_ID = '60263f14648fed5246e322d9';

function mockRequest(headers: Record<string, string>, params: Record<string, string>): Request {
  const req = authMockRequest({}, {}, null, params) as unknown as Request;
  req.headers = headers;
  return req;
}

describe('TestCleanup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects requests without the correct x-test-secret header', async () => {
    const req = mockRequest({}, { authId: AUTH_ID });
    const res: Response = authMockResponse();

    await testCleanup.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(AuthModel.findById).not.toHaveBeenCalled();
  });

  it('throws NotFoundError when the auth user does not exist', async () => {
    (AuthModel.findById as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    const req = mockRequest({ 'x-test-secret': 'chatty-test-cleanup-2026' }, { authId: AUTH_ID });
    const res: Response = authMockResponse();

    await expect(testCleanup.deleteUser(req, res)).rejects.toThrow(NotFoundError);
  });

  it('blocks deletion of a username without a recognised test prefix', async () => {
    (AuthModel.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: AUTH_ID, username: 'realUser' })
    });
    const req = mockRequest({ 'x-test-secret': 'chatty-test-cleanup-2026' }, { authId: AUTH_ID });
    const res: Response = authMockResponse();

    await expect(testCleanup.deleteUser(req, res)).rejects.toThrow(BadRequestError);
    expect(UserModel.deleteOne).not.toHaveBeenCalled();
  });

  it('deletes the test user from both collections and evicts the Redis cache entry', async () => {
    (AuthModel.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: AUTH_ID, username: 'vitestUser1' })
    });
    (UserModel.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: USER_ID })
    });
    (UserModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
    (AuthModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
    (UserCache.prototype.removeUserFromCache as jest.Mock).mockResolvedValue(undefined);

    const req = mockRequest({ 'x-test-secret': 'chatty-test-cleanup-2026' }, { authId: AUTH_ID });
    const res: Response = authMockResponse();

    await testCleanup.deleteUser(req, res);

    expect(UserModel.deleteOne).toHaveBeenCalledWith({ authId: AUTH_ID });
    expect(AuthModel.deleteOne).toHaveBeenCalledWith({ _id: AUTH_ID });
    // Regression guard: deleting a user must also evict it from the Redis
    // 'user' ZSET / hash, keyed by the User document's own _id (not authId) —
    // otherwise it resurfaces forever as a ghost entry in paginated listings.
    expect(UserCache.prototype.removeUserFromCache).toHaveBeenCalledWith(USER_ID);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('still completes the deletion even if the cache eviction fails', async () => {
    (AuthModel.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: AUTH_ID, username: 'vitestUser1' })
    });
    (UserModel.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: USER_ID })
    });
    (UserModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
    (AuthModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
    (UserCache.prototype.removeUserFromCache as jest.Mock).mockRejectedValue(new Error('redis down'));

    const req = mockRequest({ 'x-test-secret': 'chatty-test-cleanup-2026' }, { authId: AUTH_ID });
    const res: Response = authMockResponse();

    await expect(testCleanup.deleteUser(req, res)).resolves.toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
