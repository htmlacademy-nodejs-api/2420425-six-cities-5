import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  type: String,
  avatarPath: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
