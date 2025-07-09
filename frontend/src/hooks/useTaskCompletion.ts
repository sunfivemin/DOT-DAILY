import { useEffect, useState } from 'react';
import { Task } from '@/lib/api/tasks';

interface UseTaskCompletionProps {
  tasks: Task[];
}

export const useTaskCompletion = ({ tasks }: UseTaskCompletionProps) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [previousCompletedCount, setPreviousCompletedCount] = useState(0);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const completedTasks = tasks.filter(task => task.status === 'success');
    const totalTasks = tasks.length;
    const currentCompletedCount = completedTasks.length;

    // 모든 할 일이 완료되었고, 이전보다 완료된 할 일이 증가했을 때
    const allCompleted = currentCompletedCount === totalTasks && totalTasks > 0;
    const justCompleted = currentCompletedCount > previousCompletedCount;

    if (allCompleted && justCompleted) {
      setShowCelebration(true);
    }

    setPreviousCompletedCount(currentCompletedCount);
  }, [tasks, previousCompletedCount]);

  const hideCelebration = () => {
    setShowCelebration(false);
  };

  return {
    showCelebration,
    hideCelebration,
    completionStats: {
      completed: tasks.filter(task => task.status === 'success').length,
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      retry: tasks.filter(task => task.status === 'retry').length,
    }
  };
}; 