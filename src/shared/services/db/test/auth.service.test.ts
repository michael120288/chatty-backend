import { authService } from '@service/db/auth.service';
import { AuthModel } from '@auth/models/auth.schema';
import { authMock, authUserPayload } from '@root/mocks/auth.mock';

jest.mock('@auth/models/auth.schema');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAuthUser', () => {
    it('should call AuthModel.create with data', async () => {
      (AuthModel.create as jest.Mock).mockResolvedValue(authMock);
      await authService.createAuthUser(authMock);
      expect(AuthModel.create).toHaveBeenCalledWith(authMock);
    });
  });

  describe('updatePasswordToken', () => {
    it('should call AuthModel.updateOne with token and expiration', async () => {
      (AuthModel.updateOne as jest.Mock).mockResolvedValue({});
      await authService.updatePasswordToken('authId123', 'token123', 9999999);
      expect(AuthModel.updateOne).toHaveBeenCalledWith(
        { _id: 'authId123' },
        { passwordResetToken: 'token123', passwordResetExpires: 9999999 }
      );
    });
  });

  describe('getUserByUsernameOrEmail', () => {
    it('should return user when found by username or email', async () => {
      (AuthModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(authMock) });
      const user = await authService.getUserByUsernameOrEmail('Manny', 'manny@me.com');
      expect(AuthModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ $or: expect.any(Array) })
      );
      expect(user).toEqual(authMock);
    });
  });

  describe('getAuthUserByUsername', () => {
    it('should return user by username', async () => {
      (AuthModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(authMock) });
      const user = await authService.getAuthUserByUsername('Manny');
      expect(AuthModel.findOne).toHaveBeenCalledWith({ username: 'Manny' });
      expect(user).toEqual(authMock);
    });
  });

  describe('getAuthUserByEmail', () => {
    it('should return user by email', async () => {
      (AuthModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(authMock) });
      const user = await authService.getAuthUserByEmail('manny@me.com');
      expect(AuthModel.findOne).toHaveBeenCalledWith({ email: 'manny@me.com' });
      expect(user).toEqual(authMock);
    });
  });

  describe('getAuthUserByPasswordToken', () => {
    it('should return user when token is valid and not expired', async () => {
      (AuthModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(authMock) });
      const user = await authService.getAuthUserByPasswordToken('validToken');
      expect(AuthModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          passwordResetToken: 'validToken',
          passwordResetExpires: expect.objectContaining({ $gt: expect.any(Number) })
        })
      );
      expect(user).toEqual(authMock);
    });

    it('should return null when token is expired or invalid', async () => {
      (AuthModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      const user = await authService.getAuthUserByPasswordToken('expiredToken');
      expect(user).toBeNull();
    });
  });
});
