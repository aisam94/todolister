import { Timestamp } from "firebase/firestore";

export interface TodoItem {
  id: string;
  text: string;
  checked: boolean;
  archived?: boolean;
  description?: string;
  priority?: string;
  tags?: string[];
  dueDate?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  deletedAt?: Timestamp;
}

export interface TodoList {
  id: string;
  title: string;
  items: TodoItem[];
  tags?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  deletedAt?: Timestamp;
}
