import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CalendarClock,
} from 'lucide-react';
import { ArchiveTask } from '../types';

interface Props {
  task: ArchiveTask;
  onMenuClick: (id: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveToToday?: () => void;
}

export default function ArchiveItem({ task, onMenuClick, onEdit = () => {}, onDelete = () => {}, onMoveToToday = () => {} }: Props) {
  const priorityClass =
    task.priority === 1
      ? 'bg-priority-must text-priority-must'
      : task.priority === 2
      ? 'bg-priority-should text-priority-should'
      : 'bg-priority-remind text-priority-remind';

  return (
    <div className="flex items-center p-5 min-h-[64px] rounded-xl shadow-sm bg-surface-card">
      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-lg font-bold text-white ${priorityClass}`}>{task.priority}</span>
      <div className="flex-1 ml-5 flex items-center gap-2">
        <p className="text-text-strong font-medium break-words whitespace-normal">{task.title}</p>
        {task.retryCount > 0 && (
          <span className="text-xs font-semibold text-tag-retryStrong bg-tag-retryBg px-2 py-0.5 rounded-full">
            RETRY {task.retryCount}
          </span>
        )}
      </div>
      <Menu as="div" className="relative">
        <Menu.Button className="p-1 rounded-full hover:bg-surface-hover">
          <MoreHorizontal className="w-5 h-5 text-text-weak" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[180px] bg-surface-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  onClick={onMoveToToday}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
                  )}
                >
                  <CalendarClock className="w-4 h-4 mr-2" />
                  오늘 할 일로 이동
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
} 