import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../models/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { CommentModel } from '../../../models/comment.interface';
import { ReplyModel } from '../../../models/reply.interface';

@Component({
  selector: 'app-form',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  @Input({ required: true }) user!: UserModel;
  @Input() comment!: CommentModel | ReplyModel;
  @Output() addComment = new EventEmitter<CommentModel>();
  content: string = '';

  onAddComment() {
    const newComment: CommentModel = {
      id: new Date().valueOf(),
      content: this.content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: this.user,
      replies: [],
    };

    this.addComment.emit(newComment);
    this.content = '';
  }
}
