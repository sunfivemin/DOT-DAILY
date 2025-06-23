import React from 'react';

const TaskItemSkeleton = () => (
  <div className="flex items-center gap-3 p-4 bg-surface-card rounded-lg shadow-sm animate-pulse">
    <div className="w-6 h-6 bg-surface-base rounded"></div>
    <div className="flex-1 h-4 bg-surface-base rounded"></div>
    <div className="w-6 h-6 bg-surface-base rounded-full"></div>
  </div>
);

const TaskGroupSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    <div className="h-6 w-32 bg-surface-base rounded-md animate-pulse mb-4"></div>
    <div className="space-y-2">
      {Array.from({ length: count }, (_, i) => (
        <TaskItemSkeleton key={i} />
      ))}
    </div>
  </div>
);


export const TaskListSkeleton = () => {
  return (
    <div className="px-4 py-6 space-y-8 pb-24">
        <TaskGroupSkeleton count={3} />
        <TaskGroupSkeleton count={4} />
        <TaskGroupSkeleton count={2} />
    </div>
  );
};

export default TaskListSkeleton; 