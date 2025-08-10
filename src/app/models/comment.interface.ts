import { ReplyModel } from './reply.interface';
import { UserModel } from './user.interface';

export interface CommentModel {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserModel;
  replies: Array<ReplyModel>;
}
