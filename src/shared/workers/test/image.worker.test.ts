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
      const done = jest.fn();
      const job = mockJob({ key: 'userId1', value: 'url', imgId: 'img1', imgVersion: 'v1' });
      (imageService.addUserProfileImageToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.addUserProfileImageToDB(job, done);

      expect(imageService.addUserProfileImageToDB).toHaveBeenCalledWith('userId1', 'url', 'img1', 'v1');
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(done).toHaveBeenCalledWith(null, job.data);
    });

    it('calls done with error on failure', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'k', value: 'v', imgId: 'i', imgVersion: '1' });
      const err = new Error('Upload failed');
      (imageService.addUserProfileImageToDB as jest.Mock).mockRejectedValueOnce(err);

      await imageWorker.addUserProfileImageToDB(job, done);

      expect(done).toHaveBeenCalledWith(err);
    });
  });

  describe('updateBGImageToDB', () => {
    it('calls imageService.addBackgroundImageToDB with key, imgId, imgVersion', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'userId1', imgId: 'img2', imgVersion: 'v2' });
      (imageService.addBackgroundImageToDB as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.updateBGImageToDB(job, done);

      expect(imageService.addBackgroundImageToDB).toHaveBeenCalledWith('userId1', 'img2', 'v2');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('addImageToDB', () => {
    it('calls imageService.addImage with key, imgId, imgVersion and empty string', async () => {
      const done = jest.fn();
      const job = mockJob({ key: 'userId1', imgId: 'img3', imgVersion: 'v3' });
      (imageService.addImage as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.addImageToDB(job, done);

      expect(imageService.addImage).toHaveBeenCalledWith('userId1', 'img3', 'v3', '');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });

  describe('removeImageFromDB', () => {
    it('calls imageService.removeImageFromDB with imageId', async () => {
      const done = jest.fn();
      const job = mockJob({ imageId: 'img99' });
      (imageService.removeImageFromDB as jest.Mock).mockResolvedValueOnce(undefined);

      await imageWorker.removeImageFromDB(job, done);

      expect(imageService.removeImageFromDB).toHaveBeenCalledWith('img99');
      expect(done).toHaveBeenCalledWith(null, job.data);
    });
  });
});
