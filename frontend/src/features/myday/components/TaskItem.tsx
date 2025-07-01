'use client';

import { clsx } from 'clsx';
import { Menu } from '@headlessui/react';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CalendarClock,
} from 'lucide-react';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import { Task, toggleTaskStatus, deleteTask, moveToArchive } from '@/lib/api/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { useDateStore } from '@/store/useDateStore';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export default function TaskItem({
  task,
  onEdit = () => {},
}: TaskItemProps) {
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();

  const handleToggleStatus = async () => {
    try {
      const updatedTask = await toggleTaskStatus(task.id);
      
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', dateKey], (old: Task[]) => {
        return old?.map(t => {
          if (t.id === task.id) {
            console.log('교체 전 priority:', t.priority, '교체 후 priority:', updatedTask.priority);
            return updatedTask;
          }
          return t;
        }) || [];
      });
    } catch (error) {
      console.error('상태 변경 실패:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTask(task.id);
      
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', dateKey], (old: Task[]) => {
        return old?.filter(t => t.id !== task.id) || [];
      });
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handlePostpone = async () => {
    try {
      await moveToArchive(task.id);
      // 오늘 캐시에서 제거
      const todayKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', todayKey], (old: Task[] = []) => {
        return old.filter(t => t.id !== task.id);
      });
      // (보류함 캐시는 archiveTasks를 사용하는 컴포넌트에서 직접 불러오도록)
    } catch {
      alert('보류(보류함 이동)에 실패했습니다.');
    }
  };

  return (
    <div className="flex items-center p-4 rounded-xl shadow-sm bg-surface-card">
      <Checkbox
        checked={task.done}
        onCheckedChange={handleToggleStatus}
        variant={task.priority}
      />

      <div className="flex-1 ml-4 flex items-center gap-2">
        <p
          className={clsx(
            'text-text-strong',
            task.done && 'line-through text-status-disabledText'
          )}
        >
          {task.title}
        </p>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right bg-surface-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onEdit(task)}
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
                  onClick={handleDelete}
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
                  onClick={handlePostpone}
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
