import mongoose from 'mongoose';
import { tDocument, tSchema } from '../types/mongoose';

type tUser = {
  userId: string;
  name: string;
  password: string;
};

const userSchema: tSchema<tUser> = {
  userId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
};

type tUserModel = mongoose.Model<tDocument<tSchema<tUser>>>;

export const UserModel: tUserModel =
  mongoose.models['User'] ||
  mongoose.model<tDocument<tSchema<tUser>>>(
    'User',
    new mongoose.Schema(userSchema, { timestamps: true })
  );
