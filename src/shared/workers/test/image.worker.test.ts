import { imageWorker } from '@worker/image.worker';
import { imageService } from '@service/db/image.service';

jest.mock('@service/db/image.service');
jest.mock('@service/emails/mail.transport');
jest.mock('@service/queues/base.queue');

const mockJob = (data: object) => ({ data, progress: jest.fn() }) as any;

describe('ImageWorker', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addUserProfileImageToDB', () => {
    it('calls imageService.addUserProfileImageToDB with correct args', async () => {
      const job = mockJob({ key: 'userId1', value: 'url', imgId: 'img1', imgVersion: 'v1' });
      (imageService.addUserProfileImageToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.addUserProfileImageToDB(job);

      expect(imageService.addUserProfileImageToDB).toHaveBeenCalledWith('userId1', 'url', 'img1', 'v1');
      expect(job.progress).toHaveBeenCalledWith(100);
    });

    it('rejects on failure', async () => {
      const job = mockJob({ key: 'k', value: 'v', imgId: 'i', imgVersion: '1' });
      const err = new Error('Upload failed');
      (imageService.addUserProfileImageToDB as jest.Mock).mockRejectedValueOnce(err);

      await expect(imageWorker.addUserProfileImageToDB(job)).rejects.toThrow('Upload failed');
    });
  });

  describe('updateBGImageToDB', () => {
    it('calls imageService.addBackgroundImageToDB with key, imgId, imgVersion', async () => {
      const job = mockJob({ key: 'userId1', imgId: 'img2', imgVersion: 'v2' });
      (imageService.addBackgroundImageToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.updateBGImageToDB(job);

      expect(imageService.addBackgroundImageToDB).toHaveBeenCalledWith('userId1', 'img2', 'v2');
    });
  });

  describe('addImageToDB', () => {
    it('calls imageService.addImage with key, imgId, imgVersion and empty string', async () => {
      const job = mockJob({ key: 'userId1', imgId: 'img3', imgVersion: 'v3' });
      (imageService.addImage as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.addImageToDB(job);

      expect(imageService.addImage).toHaveBeenCalledWith('userId1', 'img3', 'v3', '');
    });
  });

  describe('removeImageFromDB', () => {
    it('calls imageService.removeImageFromDB with imageId and userId', async () => {
      const job = mockJob({ imageId: 'img99', userId: 'user1' });
      (imageService.removeImageFromDB as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.removeImageFromDB(job);

      expect(imageService.removeImageFromDB).toHaveBeenCalledWith('img99', 'user1');
    });
  });
});
