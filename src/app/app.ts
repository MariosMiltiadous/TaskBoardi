import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoard } from './features/task-board/task-board';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBoard, MatToolbar, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('task-boardi');
}
