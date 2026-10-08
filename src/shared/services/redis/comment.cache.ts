import { BaseCache } from '@service/redis/base.cache';
import Logger from 'bunyan';
import { find } from 'lodash';
import { config } from '@root/config';
import { ServerError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helpers';
import { ICommentDocument, ICommentNameList } from '@comment/interfaces/comment.interface';

const log: Logger = config.createLogger('commentsCache');

export class CommentCache extends BaseCache {
  constructor() {
    super('commentsCache');
  }

  public async savePostCommentToCache(postId: string, value: string): Promise<void> {
    try {
      if(!this.client.isOpen) {
        await this.client.connect();
      }
      const result = await this.client.LPUSH(`comments:${postId}`, value);
      log.debug({ postId, result }, 'Comment saved to cache');
      const commentsCount: string[] = await this.client.HMGET(`posts:${postId}`, 'commentsCount');
      let count: number = Helpers.parseJson(commentsCount[0]) as number;
      count += 1;
      await this.client.HSET(`posts:${postId}`, 'commentsCount', `${count}`);
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getCommentsFromCache(postId: string): Promise<ICommentDocument[]> {
    try {
      if(!this.client.isOpen) {
        await this.client.connect();
      }
      const reply: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: ICommentDocument[] = [];
      for(const item of reply) {
        list.push(Helpers.parseJson(item));
      }
      return list;
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getCommentsNamesFromCache(postId: string): Promise<ICommentNameList[]> {
    try {
      if(!this.client.isOpen) {
        await this.client.connect();
      }
      const commentsCount: number = await this.client.LLEN(`comments:${postId}`);
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: string[] = [];
      for(const item of comments) {
        const comment: ICommentDocument = Helpers.parseJson(item) as ICommentDocument;
        list.push(comment.username);
      }
      const response: ICommentNameList = {
        count: commentsCount,
        names: list
      };
      log.debug({ postId, count: response.count }, 'Retrieved comment names from cache');
      return [response];
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async getSingleCommentFromCache(postId: string, commentId: string): Promise<ICommentDocument[]> {
    try {
      if(!this.client.isOpen) {
        await this.client.connect();
      }
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      const list: ICommentDocument[] = [];
      for(const item of comments) {
        list.push(Helpers.parseJson(item));
      }
      const result: ICommentDocument | undefined = find(list, (listItem: ICommentDocument) => {
        return listItem._id === commentId;
      });

      // Return an empty array on a cache miss, not [undefined]. Returning
      // [undefined] made `.length` truthy in callers, causing a deref crash.
      return result ? [result] : [];
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async updateCommentInCache(postId: string, commentId: string, updatedComment: string): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      for (let i = 0; i < comments.length; i++) {
        const comment: ICommentDocument = Helpers.parseJson(comments[i]) as ICommentDocument;
        if (`${comment._id}` === commentId) {
          await this.client.LSET(`comments:${postId}`, i, updatedComment);
          break;
        }
      }
      log.debug({ postId, commentId }, 'Comment updated in cache');
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }

  public async deleteCommentFromCache(postId: string, commentId: string): Promise<void> {
    try {
      if(!this.client.isOpen) {
        await this.client.connect();
      }
      const comments: string[] = await this.client.LRANGE(`comments:${postId}`, 0, -1);
      for(const item of comments) {
        const comment: ICommentDocument = Helpers.parseJson(item) as ICommentDocument;
        if(comment._id === commentId) {
          await this.client.LREM(`comments:${postId}`, 1, item);
          break;
        }
      }
      const commentsCount: string[] = await this.client.HMGET(`posts:${postId}`, 'commentsCount');
      let count: number = Helpers.parseJson(commentsCount[0]) as number;
      count -= 1;
      await this.client.HSET(`posts:${postId}`, 'commentsCount', `${count}`);
      log.debug({ postId, commentId }, 'Comment deleted from cache');
    } catch (error) {
      log.error(error);
      throw new ServerError('Server error. Try again.');
    }
  }
}