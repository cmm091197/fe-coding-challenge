import { commentReducer, CommentState } from './comments/comments.reducers';

export interface AppState {
  comments: CommentState;
}

export const appState = {
  comments: commentReducer,
};
