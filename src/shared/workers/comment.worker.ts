import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { commentService } from '@service/db/comment.service';

const log: Logger = config.createLogger('commentWorker');

class CommentWorker {
  async addCommentToDB(job: Job): Promise<void> {
    await commentService.addCommentToDB(job.data);
    job.progress(100);
  }

  async updateCommentInDB(job: Job): Promise<void> {
    const { commentId, comment } = job.data;
    await commentService.updateCommentInDB(commentId, comment);
    job.progress(100);
  }

  async deleteCommentFromDB(job: Job): Promise<void> {
    const { postId, commentId } = job.data;
    await commentService.deleteCommentFromDB(postId, commentId);
    job.progress(100);
  }
}

export const commentWorker: CommentWorker = new CommentWorker();
