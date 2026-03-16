import { Job } from 'bull';
import Logger from 'bunyan';
import { config } from '@root/config';
import { postService } from '@service/db/post.service';

const log: Logger = config.createLogger('postWorker');

class PostWorker {
  async savePostToDB(job: Job): Promise<void> {
    const { key, value } = job.data;
    await postService.addPostToDB(key, value);
    job.progress(100);
  }

  async deletePostFromDB(job: Job): Promise<void> {
    const { keyOne, keyTwo } = job.data;
    await postService.deletePost(keyOne, keyTwo);
    job.progress(100);
  }

  async updatePostInDB(job: Job): Promise<void> {
    const { key, value } = job.data;
    await postService.editPost(key, value);
    job.progress(100);
  }
}

export const postWorker: PostWorker = new PostWorker();
