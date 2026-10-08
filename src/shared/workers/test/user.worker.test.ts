import { userWorker } from '@worker/user.worker';
import { userService } from '@service/db/user.service';

jest.mock('@service/db/user.service');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('UserWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addUserToDB', () => {
    it('calls userService.addUserData with the value', async () => {
      const value = { username: 'Bob' };
      const job = mockJob({ value });
      (userService.addUserData as jest.Mock).mockResolvedValueOnce(undefined);

      await userWorker.addUserToDB(job);

      expect(userService.addUserData).toHaveBeenCalledWith(value);
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const job = mockJob({ value: {} });
      const err = new Error('DB error');
      (userService.addUserData as jest.Mock).mockRejectedValueOnce(err);

      await expect(userWorker.addUserToDB(job)).rejects.toThrow('DB error');
    });
  });

  describe('updateUserInfo', () => {
    it('calls userService.updateUserInfo with key and value', async () => {
      const job = mockJob({ key: 'userId123', value: { quote: 'Hello' } });
      (userService.updateUserInfo as jest.Mock).mockResolvedValueOnce(undefined);

      await userWorker.updateUserInfo(job);

      expect(userService.updateUserInfo).toHaveBeenCalledWith('userId123', { quote: 'Hello' });
    });
  });

  describe('updateSocialLinks', () => {
    it('calls userService.updateSocialLinks with key and value', async () => {
      const job = mockJob({ key: 'userId123', value: { twitter: '@bob' } });
      (userService.updateSocialLinks as jest.Mock).mockResolvedValueOnce(undefined);

      await userWorker.updateSocialLinks(job);

      expect(userService.updateSocialLinks).toHaveBeenCalledWith('userId123', { twitter: '@bob' });
    });
  });

  describe('updateNotificationSettings', () => {
    it('calls userService.updateNotificationSettings with key and value', async () => {
      const job = mockJob({ key: 'userId123', value: { messages: false } });
      (userService.updateNotificationSettings as jest.Mock).mockResolvedValueOnce(undefined);

      await userWorker.updateNotificationSettings(job);

      expect(userService.updateNotificationSettings).toHaveBeenCalledWith('userId123', { messages: false });
    });
  });
});
