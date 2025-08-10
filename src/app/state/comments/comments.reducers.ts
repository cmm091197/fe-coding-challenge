import { createReducer, on } from '@ngrx/store';
import { CommentModel } from '../../models/comment.interface';
import {
  addComment,
  addDefaultComments,
  removeComment,
  updateComment,
} from './comments.actions';
import MOCK_DATA from '../../services/data.json';

export interface CommentState {
  comments: Array<CommentModel>;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CommentState = {
  comments: [],
  error: null,
  status: 'pending',
};

export const commentReducer = createReducer(
  initialState,
  on(addDefaultComments, (state, { comments }) => ({ ...state, comments })),
  on(addComment, (state, comment) => ({
    ...state,
    comments: [...state.comments, comment],
  })),
  on(updateComment, (state, updatedComment) => {
    let updatedState = { ...state, comments: [...state.comments] };
    const commentToUpdateIndex = state.comments.findIndex(
      (comment: CommentModel) => comment.id == updatedComment.id,
    );

    updatedState.comments[commentToUpdateIndex] = updatedComment;
    return updatedState;
  }),
  on(removeComment, (state, { id }) => ({
    ...state,
    comments: state.comments.filter((comment) => comment.id !== id),
  })),
);
