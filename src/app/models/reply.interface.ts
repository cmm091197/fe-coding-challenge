import { UserModel } from './user.interface';

export interface ReplyModel {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: UserModel;
}
