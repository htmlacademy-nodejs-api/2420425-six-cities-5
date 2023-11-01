import { UserType } from './user-type.enum.js';

export type User = {
  name: string;
  email: string;
  type: UserType;
  avatarPath: string;
}
