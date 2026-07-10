/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Delete } from '@comment/controllers/delete-comment';
import { authMockRequest, authMockResponse, authUserPayload } from '@root/mocks/auth.mock';
import { CommentCache } from '@service/redis/comment.cache';
import { commentQueue } from '@service/queues/comment.queue';

jest.mock('@service/redis/comment.cache');
jest.mock('@service/queues/base.queue');

describe('Delete Comment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CommentCache.prototype.deleteCommentFromCache as jest.Mock).mockResolvedValue(undefined);
  });

  it('deletes comment from cache and enqueues DB delete', async () => {
    const req = authMockRequest({}, {}, authUserPayload, { postId: 'post1', commentId: 'comment1' }) as unknown as Request;
    const res = authMockResponse();
    const addJobSpy = jest.spyOn(commentQueue, 'addCommentJob').mockImplementation(() => {});

    await Delete.prototype.comment(req, res);

    expect(CommentCache.prototype.deleteCommentFromCache).toHaveBeenCalledWith('post1', 'comment1');
    expect(addJobSpy).toHaveBeenCalledWith('deleteCommentFromDB', { postId: 'post1', commentId: 'comment1', username: 'Manny' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
  });
});
