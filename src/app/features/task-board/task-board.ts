import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskService } from './services/task-service';
import { CreateTaskDto, TaskStatus } from '../../shared/models/task.model';
import { FilterBar } from './components/filter-bar/filter-bar';
import { TaskList } from './components/task-list/task-list';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialog } from './components/task-form-dialog/task-form-dialog';
import { combineLatest, map } from 'rxjs';
import { FilterOption, FilterService } from './services/filter-service';
import { AsyncPipe } from '@angular/common';

type KanbanColumn = {
  status: TaskStatus;
  label: string;
  icon: string;
  color: string;
};

@Component({
  selector: 'app-task-board',
  imports: [TaskList, FilterBar, MatCard, MatIcon, MatButton, AsyncPipe],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  private taskService = inject(TaskService);
  private filterService = inject(FilterService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  readonly filter$ = this.filterService.filter$;

  readonly columns: KanbanColumn[] = [
    { status: 'todo', label: 'To Do', icon: 'radio_button_unchecked', color: '#1565c0' },
    { status: 'in-progress', label: 'In Progress', icon: 'pending', color: '#e65100' },
    { status: 'done', label: 'Done', icon: 'check_circle', color: '#2e7d32' },
  ];

  // THE core stream — combines tasks + filter, derives filtered result
  // Recalculates automatically whenever EITHER tasks OR filter changes
  private readonly filteredTasks$ = combineLatest([
    this.taskService.tasks$,
    this.filterService.filter$,
  ]).pipe(
    map(([tasks, filter]) => (filter === 'all' ? tasks : tasks.filter((t) => t.status === filter))),
  );

  // Per-column stream — slices filteredTasks$ further by status
  getColumnTasks$(status: TaskStatus) {
    return this.filteredTasks$.pipe(map((tasks) => tasks.filter((t) => t.status === status)));
  }

  onFilterChange(filter: FilterOption): void {
    this.filterService.setFilter(filter);
  }

  onComplete(id: string): void {
    this.taskService.complete(id);
  }

  onDelete(id: string): void {
    this.taskService.delete(id);
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(TaskFormDialog, {
      width: '480px',
      disableClose: true,
    });

    ref
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((dto: CreateTaskDto | undefined) => {
        if (!dto) return;
        this.taskService.add(dto);
      });
  }
}
