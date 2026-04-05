import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Add } from '@image/controllers/add-image';
import { Delete } from '@image/controllers/delete-image';
import { Get } from '@image/controllers/get-images';
import { validateObjectId } from '@global/helpers/object-id-validation';

class ImageRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/images/:userId',
      authMiddleware.checkAuthentication,
      validateObjectId('userId'),
      Get.prototype.images
    );
    this.router.post(
      '/images/profile',
      authMiddleware.checkAuthentication,
      Add.prototype.profileImage
    );
    this.router.post(
      '/images/background',
      authMiddleware.checkAuthentication,
      Add.prototype.backgroundImage
    );
    this.router.delete(
      '/images/:imageId',
      authMiddleware.checkAuthentication,
      validateObjectId('imageId'),
      Delete.prototype.image
    );
    this.router.delete(
      '/images/background/:bgImageId',
      authMiddleware.checkAuthentication,
      validateObjectId('bgImageId'),
      Delete.prototype.backgroundImage
    );

    return this.router;
  }
}
export const imageRoutes: ImageRoutes = new ImageRoutes();
