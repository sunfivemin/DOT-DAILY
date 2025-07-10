import React from "react";

const TaskItemSkeleton = React.memo(() => (
  <div className="flex mt-10 items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
    {/* 체크박스 스켈레톤 - 고정 사이즈 */}
    <div className="w-6 h-6 flex-shrink-0 bg-gray-200 rounded-full animate-pulse" />

    {/* 콘텐츠 스켈레톤 */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <div
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: "75%" }}
        />
        <div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* 메뉴 버튼 스켈레톤 - 고정 사이즈 */}
    <div className="w-6 h-6 flex-shrink-0 bg-gray-200 rounded-full animate-pulse" />
  </div>
));

TaskItemSkeleton.displayName = "TaskItemSkeleton";

export const TaskListSkeleton = React.memo(
  ({ count = 4 }: { count?: number }) => {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }, (_, i) => (
          <TaskItemSkeleton key={i} />
        ))}
      </div>
    );
  }
);

TaskListSkeleton.displayName = "TaskListSkeleton";
