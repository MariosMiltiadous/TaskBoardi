import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-form-dialog',
  imports: [],
  templateUrl: './task-form-dialog.html',
  styleUrl: './task-form-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormDialog {}
