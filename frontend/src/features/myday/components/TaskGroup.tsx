'use client';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type Priority = 'must' | 'should' | 'remind';

interface TaskGroupProps {
  priority: Priority;
  title: string;
  children: ReactNode;
}

const priorityMap: Record<Priority, { color: string; number: number }> = {
  must: { color: 'bg-priority-must', number: 1 },
  should: { color: 'bg-priority-should', number: 2 },
  remind: { color: 'bg-priority-remind', number: 3 },
};

export default function TaskGroup({
  priority,
  title,
  children,
}: TaskGroupProps) {
  const { color, number } = priorityMap[priority];

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
      <div className="space-y-2">{children}</div>
    </section>
  );
} 