import { Injectable } from '@angular/core';
import { Task } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private tasks: Task[] = [
    {
      id: '1', title: 'Set up CI pipeline', description: 'Configure GitHub Actions',
      status: 'todo', priority: 'high', assigneeId: 'user-1',
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      id: '2', title: 'Write unit tests', description: 'Cover TaskService methods',
      status: 'in-progress', priority: 'medium', assigneeId: 'user-1',
      createdAt: new Date(), updatedAt: new Date()
    },
    {
      id: '3', title: 'Update README', description: 'Document setup steps',
      status: 'done', priority: 'low', assigneeId: 'user-2',
      createdAt: new Date(), updatedAt: new Date()
    }
  ];

  getAll(): Task[] {
    return this.tasks;
  }

  completeTask(id: string): void {
    // Note: we're mutating the array but creating a new object
    // This prepares you for OnPush + immutability in Phase 4
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, status: 'done', updatedAt: new Date() } : t
    );
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
