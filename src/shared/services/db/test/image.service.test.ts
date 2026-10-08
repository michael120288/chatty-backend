import { imageService } from '@service/db/image.service';
import { ImageModel } from '@image/model/image.schema';
import { UserModel } from '@user/models/user.schema';

jest.mock('@image/model/image.schema');
jest.mock('@user/models/user.schema');
jest.mock('@service/queues/base.queue');

const userId1 = '507f1f77bcf86cd799439011';
const imageId1 = '507f1f77bcf86cd799439016';

describe('ImageService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addUserProfileImageToDB', () => {
    it('updates user profilePicture and creates profile image record', async () => {
      (UserModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      (ImageModel.create as jest.Mock).mockResolvedValue({});

      await imageService.addUserProfileImageToDB(userId1, 'http://img.com/pic.jpg', 'img1', 'v1');

      expect(UserModel.updateOne).toHaveBeenCalledWith(
        { _id: userId1 },
        { $set: { profilePicture: 'http://img.com/pic.jpg' } }
      );
      expect(ImageModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: userId1, imgId: 'img1', imgVersion: 'v1' })
      );
    });
  });

  describe('addBackgroundImageToDB', () => {
    it('updates user bgImageId/bgImageVersion and creates background image record', async () => {
      (UserModel.updateOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      (ImageModel.create as jest.Mock).mockResolvedValue({});

      await imageService.addBackgroundImageToDB(userId1, 'bgImg1', 'v1');

      expect(UserModel.updateOne).toHaveBeenCalledWith(
        { _id: userId1 },
        { $set: { bgImageId: 'bgImg1', bgImageVersion: 'v1' } }
      );
      expect(ImageModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: userId1, bgImageId: 'bgImg1', bgImageVersion: 'v1' })
      );
    });
  });

  describe('addImage', () => {
    it('creates profile image with correct fields', async () => {
      (ImageModel.create as jest.Mock).mockResolvedValue({});
      await imageService.addImage(userId1, 'img1', 'v1', 'profile');
      expect(ImageModel.create).toHaveBeenCalledWith({
        userId: userId1,
        bgImageVersion: '',
        bgImageId: '',
        imgVersion: 'v1',
        imgId: 'img1',
      });
    });

    it('creates background image with correct fields', async () => {
      (ImageModel.create as jest.Mock).mockResolvedValue({});
      await imageService.addImage(userId1, 'bg1', 'v2', 'background');
      expect(ImageModel.create).toHaveBeenCalledWith({
        userId: userId1,
        bgImageVersion: 'v2',
        bgImageId: 'bg1',
        imgVersion: '',
        imgId: '',
      });
    });
  });

  describe('removeImageFromDB', () => {
    it('deletes by imageId only when userId not provided', async () => {
      (ImageModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await imageService.removeImageFromDB(imageId1);
      expect(ImageModel.deleteOne).toHaveBeenCalledWith({ _id: imageId1 });
    });

    it('deletes by imageId and userId when userId provided', async () => {
      (ImageModel.deleteOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
      await imageService.removeImageFromDB(imageId1, userId1);
      expect(ImageModel.deleteOne).toHaveBeenCalledWith(
        expect.objectContaining({ _id: imageId1, userId: expect.anything() })
      );
    });
  });

  describe('getImageByBackgroundId', () => {
    it('returns image matching bgImageId', async () => {
      const mockImage = { _id: imageId1, bgImageId: 'bg1' };
      (ImageModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockImage) });
      const result = await imageService.getImageByBackgroundId('bg1');
      expect(ImageModel.findOne).toHaveBeenCalledWith({ bgImageId: 'bg1' });
      expect(result).toEqual(mockImage);
    });
  });

  describe('getImages', () => {
    it('returns aggregated images for userId', async () => {
      const mockImages = [{ _id: imageId1 }];
      (ImageModel.aggregate as jest.Mock).mockResolvedValue(mockImages);
      const result = await imageService.getImages(userId1);
      expect(ImageModel.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockImages);
    });
  });
});
