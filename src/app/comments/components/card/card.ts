import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommentModel } from '../../../models/comment.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReplyModel } from '../../../models/reply.interface';
import { UserModel } from '../../../models/user.interface';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../dialog/delete-dialog/delete-dialog';
import { DateAgoPipe } from '../../../pipes/date-ago-pipe';
import { Form } from '../form/form';

@Component({
  selector: 'app-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DateAgoPipe,
    Form,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input({ required: true }) comment!: CommentModel | ReplyModel;
  @Input({ required: true }) user!: UserModel;
  @Input() replyingTo: string = '';
  @Output() updateComment = new EventEmitter<CommentModel>();
  @Output() updateReply = new EventEmitter<ReplyModel>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() deleteReply = new EventEmitter<number>();
  @Output() addReply = new EventEmitter<ReplyModel>();

  isEditMode = false;
  showReplyForm = false;

  content: string = '';
  score!: number;

  ngOnInit(): void {
    this.content = this.comment.content;
  }

  onAddReply(newComment: CommentModel) {
    const newReply: ReplyModel = {
      id: newComment.id,
      content: newComment.content,
      createdAt: newComment.createdAt,
      score: newComment.score,
      replyingTo: this.comment.user.username,
      user: this.user,
    };
    this.addReply.emit(newReply);
    if (this.showReplyForm) this.showReplyForm = false;
  }

  onUpdate() {
    if (this.replyingTo) this.onUpdateReply();
    else this.onUpdateComment();
  }

  onUpdateReply() {
    const updatedReply: ReplyModel = {
      id: this.comment.id,
      content: this.content.trim(),
      createdAt: this.comment.createdAt,
      score: this.comment.score,
      replyingTo: this.replyingTo,
      user: this.comment.user,
    };
    this.updateReply.emit(updatedReply);
    if (this.isEditMode) this.isEditMode = false;
  }

  onUpdateComment() {
    const updatedComment: CommentModel = {
      id: this.comment.id,
      content: this.content.trim(),
      createdAt: this.comment.createdAt,
      score: this.comment.score,
      user: this.comment.user,
      replies: [],
    };

    this.updateComment.emit(updatedComment);
    if (this.isEditMode) this.isEditMode = false;
  }

  onDeleteComment() {
    if (this.replyingTo) this.deleteReply.emit(this.comment.id);
    else this.deleteComment.emit(this.comment.id);
    if (this.isEditMode) this.isEditMode = false;
  }

  openDeleteCommentDialog() {
    this.dialog
      .open(DeleteDialog)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.onDeleteComment();
        }
      });
  }

  onVote(value: 'increase' | 'decrease') {
    if (value === 'increase') this.comment.score += 1;
    else this.comment.score -= 1;

    if (this.replyingTo) this.onUpdateReply();
    else this.onUpdateComment();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.content = this.comment.content;
  }
}
