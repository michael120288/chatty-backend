import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { uploads } from '@global/helpers/cloudinary-upload';
import { BadRequestError } from '@global/helpers/error-handler';
import { addImageSchema } from '@image/schemes/images';
import { UserCache } from '@service/redis/user.cache';
import { UploadApiResponse } from 'cloudinary';
import { IUserDocument } from '@user/interfaces/user.interface';
import { socketIOImageObject } from '@socket/image';
import { imageQueue } from '@service/queues/image.queue';
import { IBgUploadResponse } from '@image/interfaces/image.interface';
import { Helpers } from '@global/helpers/helpers';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('addImage');
const userCache: UserCache = new UserCache();

export class Add {
  @joiValidation(addImageSchema)
  public async profileImage(req: Request, res: Response): Promise<void> {
    const imageData = req.body.image;
    log.info('Received image data (first 100 chars):', imageData.substring(0, 100));

    const result: UploadApiResponse = (await uploads(imageData, req.currentUser!.userId, true, true)) as UploadApiResponse;
    log.info('Cloudinary upload result:', result);
    if (!result?.public_id) {
      log.error('Upload failed. Result:', result);
      const errorMessage = result?.message || 'File upload: Error occurred. Try again.';
      throw new BadRequestError(errorMessage);
    }
    const url = `https://res.cloudinary.com/dhcw9nswr/image/upload/v${result.version}/${result.public_id}`;
    const cachedUser: IUserDocument = (await userCache.updateSingleUserItemInCache(
      `${req.currentUser!.userId}`,
      'profilePicture',
      url
    )) as IUserDocument;
    socketIOImageObject.emit('update user', cachedUser);
    imageQueue.addImageJob('addUserProfileImageToDB', {
      key: `${req.currentUser!.userId}`,
      value: url,
      imgId: result.public_id,
      imgVersion: result.version.toString()
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Image added successfully' });
  }

  @joiValidation(addImageSchema)
  public async backgroundImage(req: Request, res: Response): Promise<void> {
    const { version, publicId }: IBgUploadResponse = await Add.prototype.backgroundUpload(req.body.image);
    const bgImageId: Promise<IUserDocument> = userCache.updateSingleUserItemInCache(
      `${req.currentUser!.userId}`,
      'bgImageId',
      publicId
    ) as Promise<IUserDocument>;
    const bgImageVersion: Promise<IUserDocument> = userCache.updateSingleUserItemInCache(
      `${req.currentUser!.userId}`,
      'bgImageVersion',
      version
    ) as Promise<IUserDocument>;
    const response: [IUserDocument, IUserDocument] = (await Promise.all([bgImageId, bgImageVersion])) as [IUserDocument, IUserDocument];
    socketIOImageObject.emit('update user', {
      bgImageId: publicId,
      bgImageVersion: version,
      userId: response[0]
    });
    imageQueue.addImageJob('updateBGImageInDB', {
      key: `${req.currentUser!.userId}`,
      imgId: publicId,
      imgVersion: version.toString()
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Image added successfully' });
  }

  private async backgroundUpload(image: string): Promise<IBgUploadResponse> {
    const isDataURL = Helpers.isDataURL(image);
    let version = '';
    let publicId = '';
    if (isDataURL) {
      log.info('Background image upload - data URL detected (first 100 chars):', image.substring(0, 100));
      const result: UploadApiResponse = (await uploads(image)) as UploadApiResponse;
      if (!result.public_id) {
        const errorMessage = result?.message || 'Background image upload failed. Please try again.';
        log.error('Background upload failed:', errorMessage);
        throw new BadRequestError(errorMessage);
      } else {
        version = result.version.toString();
        publicId = result.public_id;
      }
    } else {
      log.info('Background image upload - using existing URL:', image);
      const value = image.split('/');
      version = value[value.length - 2];
      publicId = value[value.length - 1];
    }
    return { version: version.replace(/v/g, ''), publicId };
  }
}