import { Request, Response } from 'express';
import { sessionToken } from '@auth/controllers/session-token';
import { authMockRequest, authMockResponse } from '@root/mocks/auth.mock';

describe('SessionToken', () => {
  it('returns the jwt from the session when present', () => {
    const req = authMockRequest({ jwt: 'my-token-123' }, {}) as unknown as Request;
    const res = authMockResponse();

    sessionToken.read(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'my-token-123' });
  });

  it('returns null when there is no jwt in the session', () => {
    const req = authMockRequest({}, {}) as unknown as Request;
    const res = authMockResponse();

    sessionToken.read(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: null });
  });
});
