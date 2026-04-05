import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Get } from '@comment/controllers/get-comments';
import { Add } from '@comment/controllers/add-comment';
import { Delete } from '@comment/controllers/delete-comment';
import { UpdateComment } from '@comment/controllers/update-comment';
import { validateObjectId } from '@global/helpers/object-id-validation';

class CommentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/post/comments/:postId', authMiddleware.checkAuthentication, validateObjectId('postId'), Get.prototype.comments);
    this.router.get('/post/commentsnames/:postId', authMiddleware.checkAuthentication, validateObjectId('postId'), Get.prototype.commentsNamesFromCache);
    this.router.get('/post/single/comment/:postId/:commentId', authMiddleware.checkAuthentication, validateObjectId('postId', 'commentId'), Get.prototype.singleComment);

    this.router.post('/post/comment', authMiddleware.checkAuthentication, Add.prototype.comment);
    this.router.patch('/post/comment/:postId/:commentId', authMiddleware.checkAuthentication, validateObjectId('postId', 'commentId'), UpdateComment.prototype.comment);
    this.router.delete('/post/comment/:postId/:commentId', authMiddleware.checkAuthentication, validateObjectId('postId', 'commentId'), Delete.prototype.comment);

    return this.router;
  }
}

export const commentRoutes: CommentRoutes = new CommentRoutes();