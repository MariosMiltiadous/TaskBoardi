import { inject, Injectable, InjectionToken } from '@angular/core';
import { CreateTaskDto, Task } from '../../../shared/models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
  {
    id: '4',
    title: 'Integrate AI',
    description: 'Document local setup for AIa',
    status: 'done',
    priority: 'low',
    assigneeId: 'user-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Implement Signal Store',
    description: 'Implement Signal Store and service',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // BehaviorSubject — holds current value, emits to new subscribers immediately
  // Private: only this service can push new values
  private readonly _tasks$ = new BehaviorSubject<Task[]>([...inject(INITIAL_TASKS)]);

  // Public: everyone outside gets a read-only Observable — they can listen but not push
  readonly tasks$: Observable<Task[]> = this._tasks$.asObservable();

  add(dto: CreateTaskDto): void {
    const newTask: Task = {
      ...dto,
      id: crypto.randomUUID(),
      status: 'todo',
      assigneeId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.push([...this._tasks$.getValue(), newTask]);
  }

  complete(id: string): void {
    this.push(
      this._tasks$
        .getValue()
        .map((t) => (t.id === id ? { ...t, status: 'done' as const, updatedAt: new Date() } : t)),
    );
  }

  delete(id: string): void {
    this.push(this._tasks$.getValue().filter((t) => t.id !== id));
  }

  private push(tasks: Task[]): void {
    this._tasks$.next(tasks);
  }
}
