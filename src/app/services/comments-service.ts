import { inject, Injectable } from '@angular/core';
import MOCK_DATA from './data.json';
import { CommentModel } from '../models/comment.interface';
import { UserModel } from '../models/user.interface';
import { Store } from '@ngrx/store';
import { selectAllComments } from '../state/comments/comments.selectors';
import {
  addComment,
  addDefaultComments,
  removeComment,
  updateComment,
} from '../state/comments/comments.actions';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  readonly store = inject(Store);
  // comments: Array<CommentModel> = MOCK_DATA.comments;
  user: UserModel = MOCK_DATA.currentUser;

  loadDefaultComments() {
    this.store.dispatch(addDefaultComments({ comments: MOCK_DATA.comments }));
  }

  getUser() {
    return this.user;
  }

  getCommentsStore() {
    return this.store.select(selectAllComments);
  }

  // getComments() {
  //   // console.log(this.comments);
  //   return [...this.comments];
  // }

  createComment(comment: CommentModel) {
    // this.comments.push(comment);
    this.store.dispatch(addComment(comment));
  }

  updateComment(updatedComment: CommentModel) {
    // const commentToUpdateIndex = this.comments.findIndex(
    //   (comment: CommentModel) => updatedComment.id == comment.id,
    // );
    // this.comments[commentToUpdateIndex] = updatedComment;
    this.store.dispatch(updateComment(updatedComment));
  }

  deleteComment(id: number) {
    this.store.dispatch(removeComment({ id }));
  }
}
