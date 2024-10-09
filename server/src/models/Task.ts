import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  description: string;
  points: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  description: { type: String, required: true },
  points: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ITask>('Task', TaskSchema);