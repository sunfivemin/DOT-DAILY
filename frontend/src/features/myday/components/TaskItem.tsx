'use client';

import { clsx } from 'clsx';

interface TaskItemProps {
  label: string;
  done?: boolean;
  priority: 'must' | 'should' | 'remind';
}

export default function TaskItem({ label, done, priority }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl shadow-sm bg-surface-card">
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            'w-5 h-5 rounded-full text-xs flex items-center justify-center text-white',
            {
              'bg-priority-must': priority === 'must',
              'bg-priority-should': priority === 'should',
              'bg-priority-remind': priority === 'remind',
            }
          )}
        >
          {priority === 'must' ? '1' : priority === 'should' ? '2' : '3'}
        </div>
        <p
          className={clsx(
            'text-brand-dark',
            done && 'line-through text-status-disabledText'
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
