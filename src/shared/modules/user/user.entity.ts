import { getModelForClass, prop, defaultClasses } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, minlength: 6, maxlength: 12 })
  public password: string;

  @prop({ required: true })
  public type: UserType;

  @prop({ required: false, default: 'default.jpg' })
  public avatarPath: string;
}

export const UserModel = getModelForClass(UserEntity);
