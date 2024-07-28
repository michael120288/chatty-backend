import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { IReactionDocument, IReactionJob } from '@reaction/interfaces/reaction.interface';
import { addReactionSchema } from '@reaction/schemes/reactions';
import { reactionQueue } from '@service/queues/reaction.queue';
import { ReactionCache } from '@service/redis/reaction.cache';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { ObjectId } from 'mongodb';

const reactionCache: ReactionCache = new ReactionCache();

export class Add {
  @joiValidation(addReactionSchema)
  public async reaction(req:Request, res:Response){
    const {userTo, postId, type, previousReaction, postReactions, profilePicture} =req.body
    const reactionObject: IReactionDocument = {
      _id: new ObjectId(),
      username: req.currentUser!.username,
      avatarColor: req.currentUser!.avatarColor,
      type,
      postId,
      profilePicture,
    } as IReactionDocument
    await reactionCache.savePostReactionToCache(postId, reactionObject,postReactions, type, previousReaction)
    const databaseReactionData: IReactionJob = {
      postId,
      userTo,
      userFrom: req.currentUser!.userId,
      username:req.currentUser!.username,
      type,
      reactionObject,
      previousReaction,
    }
    reactionQueue.addReactionJob('addReactionToDB', databaseReactionData)
    res.status(HTTP_STATUS.OK).json({message : 'Reaction added successfully'})
  }
}