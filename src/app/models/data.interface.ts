import { CommentModel } from './comment.interface';
import { UserModel } from './user.interface';

export interface DataModel {
  currentUser: UserModel;
  comments: Array<CommentModel>;
}
