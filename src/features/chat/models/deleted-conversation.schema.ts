import mongoose, { Model, model, Schema } from 'mongoose';
import { IDeletedConversationDocument } from '@chat/interfaces/conversation.interface';

const deletedConversationSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

deletedConversationSchema.index({ userId: 1, receiverId: 1 }, { unique: true });

const DeletedConversationModel: Model<IDeletedConversationDocument> = model<IDeletedConversationDocument>(
  'DeletedConversation',
  deletedConversationSchema,
  'DeletedConversation'
);
export { DeletedConversationModel };
