'use client';

import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import {
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
  CalendarClock,
} from 'lucide-react';
import Checkbox from '@/components/ui/Checkbox/Checkbox';

type Priority = 'must' | 'should' | 'remind';

interface TaskItemProps {
  label: string;
  done?: boolean;
  retryCount?: number;
  priority: Priority;
  onToggleStatus?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPostpone?: () => void;
}

export default function TaskItem({
  label,
  done = false,
  retryCount,
  priority,
  onToggleStatus = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onPostpone = () => {},
}: TaskItemProps) {
  return (
    <div className="flex items-center p-4 rounded-xl shadow-sm bg-surface-card">
      <Checkbox
        checked={done}
        onCheckedChange={onToggleStatus}
        variant={priority}
      />

      <div className="flex-1 ml-4 flex items-center gap-2">
        <p
          className={clsx(
            'text-text-strong',
            done && 'line-through text-status-disabledText'
          )}
        >
          {label}
        </p>
        {retryCount && retryCount > 0 && (
          <span className="text-xs font-semibold text-tag-retryStrong bg-tag-retryBg px-2 py-0.5 rounded-full">
            RETRY {retryCount}
          </span>
        )}
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="p-1 rounded-full hover:bg-surface-hover">
          <MoreHorizontal className="w-5 h-5 text-text-weak" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right bg-surface-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
                  )}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  수정
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
                  )}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onPostpone}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
                  )}
                >
                  <CalendarClock className="w-4 h-4 mr-2" />
                  보류
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
