import { inject, Injectable, InjectionToken } from '@angular/core';
import { CreateTaskDto, Task, TaskUpdate } from '../../../shared/models/task.model';

// InjectionToken for initial seed data — swappable in tests without touching the service
export const INITIAL_TASKS = new InjectionToken<Task[]>('INITIAL_TASKS', {
  providedIn: 'root',
  factory: () => MOCK_TASKS,
});

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Set up CI pipeline',
    description: 'Configure GitHub Actions for build and test',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Write unit tests',
    description: 'Cover TaskService and FilterService methods',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Update README',
    description: 'Document local setup and environment variables',
    status: 'done',
    priority: 'low',
    assigneeId: 'user-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [...inject(INITIAL_TASKS)];

  getAll(): Task[] {
    return this.tasks;
  }

  add(dto: CreateTaskDto): Task {
    const newTask: Task = {
      ...dto,
      id: crypto.randomUUID(), // browser-native UUID — no library needed
      status: 'todo', // service decides default status, not the caller
      assigneeId: 'user-1', // hardcoded for now — Phase 4 AuthService replaces this
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks = [...this.tasks, newTask]; // immutable — new array reference
    return newTask;
  }

  update(id: string, changes: TaskUpdate): void {
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, ...changes, updatedAt: new Date() } : t,
    );
  }

  complete(id: string): void {
    this.update(id, { status: 'done' });
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
