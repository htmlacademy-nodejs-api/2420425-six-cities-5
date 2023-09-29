import { User } from './user.type.js';

export type Comment = {
  text: string;
  publishedDate: Date;
  rate: number;
  author: User;
}