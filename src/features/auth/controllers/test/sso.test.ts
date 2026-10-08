/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { sso } from '@auth/controllers/sso';
import { authService } from '@service/db/auth.service';
import { userService } from '@service/db/user.service';
import { authMock, authMockRequest, authMockResponse, authUserPayload } from '@root/mocks/auth.mock';
import { mergedAuthAndUserData } from '@root/mocks/user.mock';
import { BadRequestError } from '@global/helpers/error-handler';
import { tokenBlocklistCache } from '@service/redis/token-blocklist.cache';

jest.mock('@service/db/auth.service');
jest.mock('@service/db/user.service');
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/token-blocklist.cache');

describe('SSO', () => {
  beforeEach(() => jest.clearAllMocks());

  it('throws BadRequestError when no token is provided', async () => {
    const req = authMockRequest({}, { token: '' } as any) as unknown as Request;
    const res = authMockResponse();

    await expect(sso.login(req, res)).rejects.toThrow(BadRequestError);
  });

  it('throws BadRequestError when user is not found in auth service', async () => {
    const token = JWT.sign({ username: 'Nobody' }, process.env.JWT_TOKEN!);
    const req = authMockRequest({}, { token } as any) as unknown as Request;
    const res = authMockResponse();
    (authService.getAuthUserByUsername as jest.Mock).mockResolvedValueOnce(null);

    await expect(sso.login(req, res)).rejects.toThrow(BadRequestError);
  });

  it('throws BadRequestError when the token has been revoked (e.g. after signout)', async () => {
    const token = JWT.sign({ username: 'Manny', jti: 'revoked-jti' }, process.env.JWT_TOKEN!);
    const req = authMockRequest({}, { token } as any) as unknown as Request;
    const res = authMockResponse();
    (tokenBlocklistCache.isTokenRevoked as jest.Mock).mockResolvedValueOnce(true);

    await expect(sso.login(req, res)).rejects.toThrow(BadRequestError);
    expect(authService.getAuthUserByUsername).not.toHaveBeenCalled();
  });

  it('sets session jwt and returns 200 with user data on success', async () => {
    const token = JWT.sign({ username: 'Manny' }, process.env.JWT_TOKEN!);
    const req = authMockRequest({}, { token } as any) as unknown as Request;
    const res = authMockResponse();

    (authService.getAuthUserByUsername as jest.Mock).mockResolvedValueOnce(authMock);
    (userService.getUserByAuthId as jest.Mock).mockResolvedValueOnce(mergedAuthAndUserData);

    await sso.login(req, res);

    expect(req.session?.jwt).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'SSO login successful', token: expect.any(String) })
    );
  });
});
