import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CommentState } from './comments.reducers';

export const selectComments = (state: AppState) => state.comments;
export const selectAllComments = createSelector(
  selectComments,
  (state: CommentState) => state.comments,
);
