export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  createdAt: Date;
  updatedAt: Date;
}

// This is key — you'll use this for immutable updates later
export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;

// NEW — what the dialog form submits. No id, no dates — service owns those.
export type CreateTaskDto = Pick<Task, 'title' | 'description' | 'priority'>;
