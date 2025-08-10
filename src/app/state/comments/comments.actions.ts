import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../../models/comment.interface';

export const addDefaultComments = createAction(
  'Reset Comments',
  props<{ comments: Array<CommentModel> }>(),
);
export const addComment = createAction('Add Comment', props<CommentModel>());
export const updateComment = createAction(
  'Update Comment',
  props<CommentModel>(),
);

export const removeComment = createAction(
  'Remove Comment',
  props<{ id: number }>(),
);
