import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { imageService } from '@service/db/image.service';

const log: Logger = config.createLogger('imageWorker');

class ImageWorker {
  async addUserProfileImageToDB(job: Job): Promise<void> {
    const { key, value, imgId, imgVersion } = job.data;
    await imageService.addUserProfileImageToDB(key, value, imgId, imgVersion);
    job.progress(100);
  }

  async updateBGImageToDB(job: Job): Promise<void> {
    const { key, imgId, imgVersion } = job.data;
    await imageService.addBackgroundImageToDB(key, imgId, imgVersion);
    job.progress(100);
  }

  async addImageToDB(job: Job): Promise<void> {
    const { key, imgId, imgVersion } = job.data;
    await imageService.addImage(key, imgId, imgVersion, '');
    job.progress(100);
  }

  async removeImageFromDB(job: Job): Promise<void> {
    const { imageId } = job.data;
    await imageService.removeImageFromDB(imageId);
    job.progress(100);
  }
}

export const imageWorker: ImageWorker = new ImageWorker();
