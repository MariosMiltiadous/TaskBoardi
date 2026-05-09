import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../../../shared/models/task.model';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatChipsModule, MatIcon, MatButton, MatTooltip],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Output() complete = new EventEmitter<string>(); // emits task id
  @Output() delete = new EventEmitter<string>();


   get statusIcon(): string {
    const icons: Record<TaskStatus, string> = {
      'todo': 'radio_button_unchecked',
      'in-progress': 'pending',
      'done': 'check_circle'
    };
    return icons[this.task.status];
  }

  get statusLabel(): string {
    const labels: Record<TaskStatus, string> = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'done': 'Done'
    };
    return labels[this.task.status];
  }

  onComplete(): void {
    this.complete.emit(this.task.id);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
