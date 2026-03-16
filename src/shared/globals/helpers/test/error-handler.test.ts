import HTTP_STATUS from 'http-status-codes';
import {
  BadRequestError,
  FileTooLargeError,
  JoiRequestValidationError,
  NotAuthorizedError,
  NotFoundError,
  ServerError,
} from '@global/helpers/error-handler';

describe('Custom Error Classes', () => {
  // ── JoiRequestValidationError ────────────────────────────────────────────

  describe('JoiRequestValidationError', () => {
    const err = new JoiRequestValidationError('Validation failed');

    it('extends Error', () => {
      expect(err).toBeInstanceOf(Error);
    });

    it('has the correct message', () => {
      expect(err.message).toBe('Validation failed');
    });

    it('has statusCode 400', () => {
      expect(err.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    it('has status "error"', () => {
      expect(err.status).toBe('error');
    });

    it('serializeError returns the correct shape', () => {
      expect(err.serializeError()).toEqual({
        message: 'Validation failed',
        statusCode: HTTP_STATUS.BAD_REQUEST,
        status: 'error',
      });
    });
  });

  // ── BadRequestError ──────────────────────────────────────────────────────

  describe('BadRequestError', () => {
    const err = new BadRequestError('Bad request');

    it('has statusCode 400', () => {
      expect(err.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    it('serializeError includes the message', () => {
      expect(err.serializeError().message).toBe('Bad request');
    });
  });

  // ── NotFoundError ────────────────────────────────────────────────────────

  describe('NotFoundError', () => {
    const err = new NotFoundError('Resource not found');

    it('has statusCode 404', () => {
      expect(err.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    });

    it('has status "error"', () => {
      expect(err.status).toBe('error');
    });

    it('serializeError returns correct shape', () => {
      expect(err.serializeError()).toEqual({
        message: 'Resource not found',
        statusCode: HTTP_STATUS.NOT_FOUND,
        status: 'error',
      });
    });
  });

  // ── NotAuthorizedError ───────────────────────────────────────────────────

  describe('NotAuthorizedError', () => {
    const err = new NotAuthorizedError('Unauthorized');

    it('has statusCode 401', () => {
      expect(err.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    it('serializeError includes the message', () => {
      expect(err.serializeError().message).toBe('Unauthorized');
    });
  });

  // ── FileTooLargeError ────────────────────────────────────────────────────

  describe('FileTooLargeError', () => {
    const err = new FileTooLargeError('File too large');

    it('has statusCode 413', () => {
      expect(err.statusCode).toBe(HTTP_STATUS.REQUEST_TOO_LONG);
    });

    it('serializeError returns correct shape', () => {
      expect(err.serializeError()).toEqual({
        message: 'File too large',
        statusCode: HTTP_STATUS.REQUEST_TOO_LONG,
        status: 'error',
      });
    });
  });

  // ── ServerError ──────────────────────────────────────────────────────────

  describe('ServerError', () => {
    const err = new ServerError('Service unavailable');

    it('has statusCode 503', () => {
      expect(err.statusCode).toBe(HTTP_STATUS.SERVICE_UNAVAILABLE);
    });

    it('serializeError includes the message', () => {
      expect(err.serializeError().message).toBe('Service unavailable');
    });
  });
});
