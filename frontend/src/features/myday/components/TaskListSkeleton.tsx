import React from 'react';

const TaskItemSkeleton = () => (
  <div className="flex items-center gap-3 p-4 bg-surface-card rounded-lg shadow-sm animate-pulse">
    <div className="w-6 h-6 bg-surface-base rounded"></div>
    <div className="flex-1 h-4 bg-surface-base rounded"></div>
    <div className="w-6 h-6 bg-surface-base rounded-full"></div>
  </div>
);

export const TaskListSkeleton = ({ count = 2 }: { count?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, i) => (
        <TaskItemSkeleton key={i} />
      ))}
    </div>
  );
};

export default TaskListSkeleton; 