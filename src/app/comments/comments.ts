import { Component, inject, OnInit } from '@angular/core';
import { Card } from './components/card/card';
import { CommentsService } from '../services/comments-service';
import { CommentModel } from '../models/comment.interface';
import { UserModel } from '../models/user.interface';
import { Form } from './components/form/form';
import { ReplyModel } from '../models/reply.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comments',
  imports: [Card, Form],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments implements OnInit {
  readonly commentService = inject(CommentsService);
  readonly store = inject(Store);
  currentUser!: UserModel;
  comments: Array<CommentModel> = [];

  ngOnInit() {
    this.currentUser = this.commentService.getUser();
    this.getComments();
  }

  getComments() {
    this.comments = [];
    this.commentService.getCommentsStore().subscribe((res) => {
      this.comments = JSON.parse(JSON.stringify(res));
      if (!this.comments.length) {
        this.commentService.loadDefaultComments();
      }
    });
  }

  sortComments() {
    return this.comments.sort(
      (a: CommentModel, b: CommentModel) => b.score - a.score,
    );
  }

  sortReplies(comment: CommentModel) {
    const sortedReplies = [...comment.replies];
    return sortedReplies.sort((a: ReplyModel, b: ReplyModel) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.valueOf() + dateB.valueOf();
    });
  }

  addComment(comment: CommentModel) {
    this.commentService.createComment(comment);
  }

  updateComment(updatedComment: CommentModel) {
    this.commentService.updateComment(updatedComment);
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id);
  }

  onAddReply(reply: ReplyModel, commentId: number) {
    const commentToUpdate = this.comments.find(
      (comment: CommentModel) => commentId == comment.id,
    );
    if (commentToUpdate) {
      commentToUpdate.replies.push(reply);
      this.updateComment(commentToUpdate);
    }
  }

  onDeleteReply(replyId: number, commentId: number) {
    const commentToUpdate = this.comments.find(
      (comment: CommentModel) => commentId == comment.id,
    );
    if (commentToUpdate) {
      commentToUpdate.replies = commentToUpdate.replies.filter(
        (reply: ReplyModel) => reply.id !== replyId,
      );

      this.updateComment(commentToUpdate);
    }
  }

  onUpdateReply(updatedReply: ReplyModel, commentId: number) {
    const comment = this.comments.find(
      (comment: CommentModel) => commentId == comment.id,
    );

    if (comment) {
      const replyIndex = comment.replies.findIndex(
        (reply: ReplyModel) => updatedReply.id === reply.id,
      );
      comment.replies[replyIndex] = updatedReply;
      this.updateComment(comment);
    }
  }

  onUpdateComment(updateComment: CommentModel) {
    const commentToUpdate = this.comments.find(
      (comment: CommentModel) => comment.id == updateComment.id,
    );
    if (commentToUpdate) {
      updateComment.replies = commentToUpdate.replies;
      this.updateComment(updateComment);
    }
  }
}
