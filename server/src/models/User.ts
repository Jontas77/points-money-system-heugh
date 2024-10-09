import mongoose, { Document, Schema } from 'mongoose';

interface IPointHistory {
  points: number;
  reason: string;
  date: Date;
}

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  points: number;
  money: number;
  role: 'parent' | 'child';
  pointHistory: IPointHistory[];
}

const PointsHistorySchema: Schema = new Schema({
  points: { type: Number, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true, enum: ['parent', 'child'] },
  pointHistory: { type: [PointsHistorySchema], default: [] },
});

export default mongoose.model<IUser>('User', UserSchema);