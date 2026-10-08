import { IReaction, IReactionJob, IReactions } from '@reaction/interfaces/reaction.interface';
import { reactionQueue } from '@service/queues/reaction.queue';
import { ReactionCache } from '@service/redis/reaction.cache';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@global/helpers/error-handler';

const reactionCache: ReactionCache = new ReactionCache();

const VALID_REACTION_KEYS = new Set<keyof IReactions>(['like', 'love', 'happy', 'wow', 'sad', 'angry']);

export class Remove {
  public async reaction(req: Request, res: Response): Promise<void> {
    const { postId, previousReaction, postReactions } = req.params;

    let parsedReactions: IReactions;
    try {
      parsedReactions = JSON.parse(postReactions);
    } catch {
      throw new BadRequestError('Invalid postReactions format');
    }

    if (typeof parsedReactions !== 'object' || Array.isArray(parsedReactions) || parsedReactions === null) {
      throw new BadRequestError('Invalid postReactions format');
    }
    for (const [key, val] of Object.entries(parsedReactions)) {
      if (!VALID_REACTION_KEYS.has(key as keyof IReactions) || typeof val !== 'number') {
        throw new BadRequestError('Invalid postReactions format');
      }
    }

    await reactionCache.removePostReactionFromCache(postId, `${req.currentUser!.username}`, parsedReactions as unknown as IReaction);
    const databaseReactionData: IReactionJob = {
      postId,
      username: req.currentUser!.username,
      previousReaction
    };
    reactionQueue.addReactionJob('removeReactionFromDB', databaseReactionData);
    res.status(HTTP_STATUS.OK).json({ message: 'Reaction removed from post' });
  }
}