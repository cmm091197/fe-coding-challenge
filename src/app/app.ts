import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Comments } from './comments/comments';
import { StoreModule } from '@ngrx/store';
import { appState } from './state/app.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Comments],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('fe-coding-challenge');
}
