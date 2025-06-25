export interface ArchiveTask {
  id: string;
  title: string;
  priority: 1 | 2 | 3;
  retryCount: number;
  dueDate: string; // 'YY.MM.DD'
} 