export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

export type UserFormData = Omit<User, "id">;
export type TaskFormData = Omit<Task, "id" | "userId">;

export interface ApiResponse<T> {
  data: T;
}
