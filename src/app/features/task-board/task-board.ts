import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from './services/task-service';
import { Task, TaskStatus } from '../../shared/models/task.model';
import { FilterBar } from './components/filter-bar/filter-bar';
import { TaskList } from './components/task-list/task-list';
import { MatCard } from '@angular/material/card';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

type FilterOption = TaskStatus | 'all';

interface KanbanColumn {
  status: TaskStatus;
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-task-board',
  imports: [TaskList, FilterBar, MatCard, MatIcon],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard implements OnInit {
  private taskService = inject(TaskService);

  readonly columns: KanbanColumn[] = [
    { status: 'todo', label: 'To Do', icon: 'radio_button_unchecked', color: '#1565c0' },
    { status: 'in-progress', label: 'In Progress', icon: 'pending', color: '#e65100' },
    { status: 'done', label: 'Done', icon: 'check_circle', color: '#2e7d32' },
  ];

  private currentFilter: FilterOption = 'all';
  private allTasks: Task[] = [];
  filteredTasks: Task[] = [];

  ngOnInit(): void {
    this.allTasks = this.taskService.getAll();
    this.filteredTasks = this.allTasks;
  }

  getTasksForColumn(status: TaskStatus): Task[] {
    return this.filteredTasks.filter((t) => t.status === status);
  }

  onFilterChange(filter: FilterOption): void {
    this.currentFilter = filter;
    this.filteredTasks =
      filter === 'all' ? this.allTasks : this.allTasks.filter((t) => t.status === filter);
  }

  onComplete(taskId: string): void {
    this.taskService.completeTask(taskId);
    this.allTasks = this.taskService.getAll();
    this.onFilterChange(this.currentFilter);
  }

  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.allTasks = this.taskService.getAll();
    this.onFilterChange(this.currentFilter);
  }
}
