import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { authUserPayload, authMockRequest, authMockResponse } from '@root/mocks/auth.mock';
import { NotAuthorizedError } from '@global/helpers/error-handler';

const mockNext: NextFunction = jest.fn();

describe('AuthMiddleware', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    (mockNext as jest.Mock).mockClear();
  });

  // ── verifyUser ───────────────────────────────────────────────────────────

  describe('verifyUser', () => {
    it('throws NotAuthorizedError when session has no jwt', () => {
      const req = authMockRequest({}, {}) as unknown as Request;
      const res = authMockResponse();

      expect(() => authMiddleware.verifyUser(req, res, mockNext)).toThrow(NotAuthorizedError);
    });

    it('throws NotAuthorizedError for a tampered / invalid token', () => {
      const req = authMockRequest({ jwt: 'invalid.token.here' }, {}) as unknown as Request;
      const res = authMockResponse();

      expect(() => authMiddleware.verifyUser(req, res, mockNext)).toThrow(NotAuthorizedError);
    });

    it('sets req.currentUser and calls next() for a valid JWT', () => {
      const token = JWT.sign(authUserPayload, process.env.JWT_TOKEN!);
      const req = authMockRequest({ jwt: token }, {}) as unknown as Request;
      const res = authMockResponse();

      authMiddleware.verifyUser(req, res, mockNext);

      expect(req.currentUser).toBeDefined();
      expect((req.currentUser as typeof authUserPayload).username).toBe('Manny');
      expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it('sets the full payload on req.currentUser', () => {
      const token = JWT.sign(authUserPayload, process.env.JWT_TOKEN!);
      const req = authMockRequest({ jwt: token }, {}) as unknown as Request;
      const res = authMockResponse();

      authMiddleware.verifyUser(req, res, mockNext);

      expect(req.currentUser).toMatchObject({
        userId: authUserPayload.userId,
        uId: authUserPayload.uId,
        username: authUserPayload.username,
        email: authUserPayload.email,
      });
    });
  });

  // ── checkAuthentication ──────────────────────────────────────────────────

  describe('checkAuthentication', () => {
    it('throws NotAuthorizedError when currentUser is not set', () => {
      const req = authMockRequest({}, {}, null) as unknown as Request;
      const res = authMockResponse();

      expect(() => authMiddleware.checkAuthentication(req, res, mockNext)).toThrow(NotAuthorizedError);
    });

    it('calls next() when currentUser is set', () => {
      const req = authMockRequest({}, {}, authUserPayload) as unknown as Request;
      const res = authMockResponse();

      authMiddleware.checkAuthentication(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });
});
