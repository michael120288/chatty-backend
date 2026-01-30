import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('cloudinaryUpload');

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    // Validate data URL format before attempting upload
    if (file.startsWith('data:')) {
      const dataUrlPattern = /^data:image\/(png|jpeg|jpg|gif|webp|heic|heif);base64,/;
      if (!dataUrlPattern.test(file)) {
        log.error('Invalid data URL format. Expected: data:image/[type];base64,[data]. Received:', file.substring(0, 50));
        resolve({
          message: 'Invalid data URL format. Expected format: data:image/[type];base64,[data]. Supported: png, jpeg, jpg, gif, webp, heic, heif',
          http_code: 400
        } as UploadApiErrorResponse);
        return;
      }
    }

    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          log.error('Cloudinary upload error:', error);
          log.error('Failed file info (first 100 chars):', file.substring(0, 100));
          resolve(error);
        }
        log.info('Cloudinary upload success:', result);
        resolve(result);
      }
    );
  });
}

export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: 'video',
        chunk_size: 50000,
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
