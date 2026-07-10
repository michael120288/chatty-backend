import { IGetPostsQuery, IPostDocument, IQueryComplete, IQueryDeleted } from "@post/interfaces/post.interface";
import { PostModel } from "@post/models/post.schema";
import { IUserDocument } from "@user/interfaces/user.interface";
import { UserModel } from "@user/models/user.schema";
import { CommentsModel } from "@comment/models/comment.schema";
import { ReactionModel } from "@reaction/models/reaction.schema";
import { Query, UpdateQuery } from "mongoose";

class PostService {
  public async addPostToDB(userId: string, createPost:IPostDocument): Promise<void> {
    const post: Promise<IPostDocument> = PostModel.create(createPost);
    const user: UpdateQuery<IUserDocument> = UserModel.updateOne({_id:userId}, {$inc:{postsCount:1}})
    await Promise.all([post, user])
  }
  public async getPosts(query: IGetPostsQuery, skip = 0, limit = 0, sort: Record<string, 1 | -1>): Promise<IPostDocument[]> {
    let postQuery = {};
    if (query?.imgId && query?.gifUrl) {
      postQuery = { $or: [{ imgId: { $ne: '' } }, { gifUrl: { $ne: '' } }] };
    } else if (query?.videoId) {
      postQuery = { $or: [{ videoId: { $ne: '' } }] };
    } else {
      postQuery = query;
    }
    const posts: IPostDocument[] = await PostModel.aggregate([{ $match: postQuery }, { $sort: sort }, { $skip: skip }, { $limit: limit }]);
    return posts;
  }

  public async postsCount(): Promise<number>{
    const count: number = await PostModel.find({}).countDocuments()
    return count

  }
  public async deletePost(postId: string, userId:string ): Promise<void>{
    const deletePost: Query<IQueryComplete & IQueryDeleted, IPostDocument> = PostModel.deleteOne({_id:postId})
    // Cascade-delete the post's comments and reactions so no orphaned documents remain.
    const deleteComments: Query<IQueryComplete & IQueryDeleted, unknown> = CommentsModel.deleteMany({postId})
    const deleteReactions: Query<IQueryComplete & IQueryDeleted, unknown> = ReactionModel.deleteMany({postId})
    const decrementPostCount: UpdateQuery<IUserDocument> = UserModel.updateOne({_id:userId}, {$inc:{postsCount: -1}})
    await Promise.all([deletePost, deleteComments, deleteReactions, decrementPostCount])
  }
  public async getPostOwnerFromDB(postId: string): Promise<string | null> {
    const post = await PostModel.findOne({ _id: postId }, { userId: 1 }).exec();
    return post ? `${post.userId}` : null;
  }

  public async editPost(postId: string, updatedPost: IPostDocument): Promise<void> {
    const updatePost: UpdateQuery<IUserDocument> = PostModel.updateOne({ _id: postId }, {
      $set: {
        post: updatedPost.post,
        bgColor: updatedPost.bgColor,
        feelings: updatedPost.feelings,
        privacy: updatedPost.privacy,
        gifUrl: updatedPost.gifUrl,
        imgId: updatedPost.imgId,
        imgVersion: updatedPost.imgVersion,
        videoId: updatedPost.videoId,
        videoVersion: updatedPost.videoVersion
      }
    });
    await Promise.all([updatePost]);
  }
}
export const postService: PostService = new PostService();