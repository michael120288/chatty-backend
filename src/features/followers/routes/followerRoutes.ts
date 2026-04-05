import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Add } from '@follower/controllers/follower-user';
import { Remove } from '@follower/controllers/unfollow-user';
import { Get } from '@follower/controllers/get-followers';
import { AddUser } from '@follower/controllers/block-user';
import { validateObjectId } from '@global/helpers/object-id-validation';

class FollowerRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.put(
      '/user/follow/:followerId',
      authMiddleware.checkAuthentication,
      validateObjectId('followerId'),
      Add.prototype.follower,
    );
    this.router.put(
      '/user/unfollow/:followeeId/:followerId',
      authMiddleware.checkAuthentication,
      validateObjectId('followeeId', 'followerId'),
      Remove.prototype.follower,
    );
    this.router.get(
      '/user/following',
      authMiddleware.checkAuthentication,
      Get.prototype.userFollowing,
    );
    this.router.get(
      '/user/followers/:userId',
      authMiddleware.checkAuthentication,
      validateObjectId('userId'),
      Get.prototype.userFollowers,
    );
    this.router.put(
      '/user/block/:followerId',
      authMiddleware.checkAuthentication,
      validateObjectId('followerId'),
      AddUser.prototype.block,
    );
    this.router.put(
      '/user/unblock/:followerId',
      authMiddleware.checkAuthentication,
      validateObjectId('followerId'),
      AddUser.prototype.unblock,
    );
    return this.router;
  }
}
export const followerRoutes: FollowerRoutes = new FollowerRoutes();
