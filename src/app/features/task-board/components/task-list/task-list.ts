import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { TaskCard } from '../task-card/task-card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard, MatIcon],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  @Input({ required: true }) tasks: Task[] = [];
  @Output() complete = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
}
