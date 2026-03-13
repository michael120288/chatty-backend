import { model, Model, Schema, Document } from 'mongoose';

export interface IProgressDocument extends Document {
  userId: string;
  completedLevels: string[];
  xp: number;
  updatedAt: Date;
}

const progressSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true, unique: true },
  completedLevels: { type: [String], default: [] },
  xp: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const ProgressModel: Model<IProgressDocument> = model<IProgressDocument>('TestQuestProgress', progressSchema);
export { ProgressModel };
