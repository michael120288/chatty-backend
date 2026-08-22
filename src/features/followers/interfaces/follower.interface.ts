import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';
import { IUserDocument } from '@user/interfaces/user.interface';

export interface IFollowers {
  userId: string;
  // The followee's own _id — present on the client's 'unfollow user' payload
  // (the target user's card data) so the handler can re-fetch fresh cached
  // data for that user before broadcasting 'remove follower'.
  _id?: string;
}

export interface IFollowerDocument extends Document {
  _id: mongoose.Types.ObjectId | string;
  followerId: mongoose.Types.ObjectId;
  followeeId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

export interface IFollower {
  _id: mongoose.Types.ObjectId | string;
  followeeId?: IFollowerData;
  followerId?: IFollowerData;
  createdAt?: Date;
}

export interface IFollowerData {
  avatarColor: string;
  followersCount: number;
  followingCount: number;
  profilePicture: string;
  postCount: number;
  username: string;
  uId: string;
  _id?: mongoose.Types.ObjectId;
  userProfile?: IUserDocument;
}

export interface IFollowerJobData {
  keyOne?: string;
  keyTwo?: string;
  username?: string;
  followerDocumentId?: ObjectId;
}

export interface IBlockedUserJobData {
  keyOne?: string;
  keyTwo?: string;
  type?: string;
}
