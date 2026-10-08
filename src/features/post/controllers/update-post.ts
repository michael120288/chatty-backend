import { Request, Response } from 'express';
import { PostCache } from '@service/redis/post.cache';
import HTTP_STATUS from 'http-status-codes';
import { socketIOPostObject } from '@socket/post';
import { postQueue } from '@service/queues/post.queue';
import {
  postSchema,
  postWithImageSchema,
  postWithVideoSchema,
} from '@post/schemas/post.schemes';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { IPostDocument } from '@post/interfaces/post.interface';
import { UploadApiResponse } from 'cloudinary';
import { uploads, videoUpload } from '@global/helpers/cloudinary-upload';
import { BadRequestError, ForbiddenError, NotFoundError } from '@global/helpers/error-handler';
import { imageQueue } from '@service/queues/image.queue';
import { postService } from '@service/db/post.service';
import { withPostDefaults } from '@post/controllers/create-post';

const postCache: PostCache = new PostCache();

async function verifyPostOwnership(postId: string, userId: string): Promise<void> {
  // Ownership enforcement (prevents IDOR). Distinguish the two failure modes:
  //   - post does not exist        → 404 Not Found
  //   - post exists but not yours  → 403 Forbidden (authenticated, not permitted)
  const cachedOwnerId = await postCache.getPostOwnerFromCache(postId);
  const ownerId = cachedOwnerId ?? await postService.getPostOwnerFromDB(postId);
  if (!ownerId) {
    throw new NotFoundError(`Post ${postId} not found`);
  }
  if (ownerId !== userId) {
    throw new ForbiddenError('Not authorized to update this post');
  }
}

export class Update {
  @joiValidation(postSchema)
  public async posts(req: Request, res: Response): Promise<void> {
    const { post, bgColor, privacy, gifUrl, profilePicture, feelings } = withPostDefaults(req.body);
    const { imgVersion, imgId, videoId, videoVersion } = req.body;
    const { postId } = req.params;

    await verifyPostOwnership(postId, `${req.currentUser!.userId}`);

    const updatedPost: IPostDocument = {
      post,
      bgColor,
      privacy,
      feelings,
      gifUrl,
      profilePicture,
      imgId,
      imgVersion,
      videoId,
      videoVersion,
    } as IPostDocument;

    const postUpdated: IPostDocument = await postCache.updatePostInCache(
      postId,
      updatedPost,
    );
    socketIOPostObject.emit('update post', postUpdated, 'posts');
    postQueue.addPostJob('updatePostInDB', {
      key: postId,
      value: postUpdated,
    });
    res.status(HTTP_STATUS.OK).json({ message: 'Post updated successfully' });
  }
  @joiValidation(postWithImageSchema)
  public async postWithImage(req: Request, res: Response): Promise<void> {
    const { imgId, imgVersion } = req.body;
    if (imgId && imgVersion) {
      await Update.prototype.updatePost(req);
    } else {
      const result: UploadApiResponse =
        await Update.prototype.addFileToExistingPost(req);
      if (!result.public_id) {
        throw new BadRequestError(result.message);
      }
    }
    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Post with image updated successfully' });
  }

  @joiValidation(postWithVideoSchema)
  public async postWithVideo(req: Request, res: Response): Promise<void> {
    const { videoId, videoVersion } = req.body;
    if (videoId && videoVersion) {
      Update.prototype.updatePost(req);
    } else {
      const result: UploadApiResponse =
        await Update.prototype.addFileToExistingPost(req);
      if (!result.public_id) {
        throw new BadRequestError(result.message);
      }
    }
    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Post with video updated successfully' });
  }

  private async updatePost(req: Request): Promise<void> {
    const { post, bgColor, privacy, gifUrl, profilePicture, feelings } = withPostDefaults(req.body);
    const { imgVersion, imgId, videoId, videoVersion } = req.body;
    const { postId } = req.params;

    await verifyPostOwnership(postId, `${req.currentUser!.userId}`);

    const updatedPost: IPostDocument = {
      post,
      bgColor,
      privacy,
      feelings,
      gifUrl,
      profilePicture,
      imgId: imgId ? imgId : '',
      imgVersion: imgVersion ? imgVersion : '',
      videoId: videoId ? videoId : '',
      videoVersion: videoVersion ? videoVersion : '',
    } as IPostDocument;

    const postUpdated: IPostDocument = await postCache.updatePostInCache(
      postId,
      updatedPost,
    );
    socketIOPostObject.emit('update post', postUpdated, 'posts');
    postQueue.addPostJob('updatePostInDB', { key: postId, value: postUpdated });
  }
  private async addFileToExistingPost(
    req: Request,
  ): Promise<UploadApiResponse> {
    const { post, bgColor, privacy, gifUrl, profilePicture, feelings } = withPostDefaults(req.body);
    const { image, video } = req.body;
    const { postId } = req.params;

    await verifyPostOwnership(postId, `${req.currentUser!.userId}`);

    const result: UploadApiResponse = image
      ? ((await uploads(image)) as UploadApiResponse)
      : ((await videoUpload(video)) as UploadApiResponse);
    if (!result?.public_id) {
      return result;
    }
    const updatedPost: IPostDocument = {
      post,
      bgColor,
      privacy,
      feelings,
      gifUrl,
      profilePicture,
      imgId: image ? result.public_id : '',
      imgVersion: image ? result.version.toString() : '',
      videoId: video ? result.public_id : '',
      videoVersion: video ? result.version.toString() : '',
    } as IPostDocument;

    const postUpdated: IPostDocument = await postCache.updatePostInCache(
      postId,
      updatedPost,
    );
    socketIOPostObject.emit('update post', postUpdated, 'posts');
    postQueue.addPostJob('updatePostInDB', {
      key: postId,
      value: postUpdated,
    });
    if (image) {
      imageQueue.addImageJob('addImageToDB', {
        key: `${req.currentUser!.userId}`,
        imgId: result.public_id,
        imgVersion: result.version.toString(),
      });
    }
    return result;
  }
}
