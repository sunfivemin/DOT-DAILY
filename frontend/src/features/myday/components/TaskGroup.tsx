'use client';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';

type Priority = 'must' | 'should' | 'remind';

interface TaskGroupProps {
  priority: Priority;
  title: string;
  children: ReactNode;
  onEmptyClick?: () => void;
}

const priorityMap: Record<Priority, { color: string; number: number; emptyMessage: string }> = {
  must: { 
    color: 'bg-priority-must', 
    number: 1, 
    emptyMessage: '오늘 꼭 해야 할 일을 등록해보세요' 
  },
  should: { 
    color: 'bg-priority-should', 
    number: 2, 
    emptyMessage: '오늘 하면 좋을 일을 추가해보세요' 
  },
  remind: { 
    color: 'bg-priority-remind', 
    number: 3, 
    emptyMessage: '잊지 말아야 할 일을 기록해보세요' 
  },
};

export default function TaskGroup({
  priority,
  title,
  children,
  onEmptyClick,
}: TaskGroupProps) {
  const { color, number, emptyMessage } = priorityMap[priority];
  const childrenArray = React.Children.toArray(children);
  const hasChildren = childrenArray.length > 0;

  const showEmptyMessage = !hasChildren;
  if (showEmptyMessage) {
    console.log('EMPTY MESSAGE RENDER:', title, emptyMessage);
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            'w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold',
            color
          )}
        >
          {number}
        </div>
        <h2 className="text-lg font-bold text-text-strong">{title}</h2>
      </div>
      <div className="space-y-2">
        {hasChildren ? (
          children
        ) : (
          <button
            type="button"
            className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed w-full focus:outline-none transition hover:brightness-95 active:scale-95"
            style={{ background: 'rgba(188, 232, 241, 0.12)', borderColor: '#bce8f1' }}
            onClick={onEmptyClick}
          >
            <span className="mb-2 text-2xl">📝</span>
            <p className="font-kkonghae text-zinc-400 text-base">
              {emptyMessage}
            </p>
          </button>
        )}
      </div>
    </section>
  );
} 