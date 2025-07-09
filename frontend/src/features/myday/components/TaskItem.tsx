'use client';

import React from 'react';
import { Menu } from '@headlessui/react';
import { MoreHorizontal, Pencil, Trash2, CalendarClock } from 'lucide-react';
import clsx from 'clsx';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import { deleteTask, Task, toggleTaskStatus, moveToArchive } from '@/lib/api/tasks';
import { format } from 'date-fns';
import { useDateStore } from '@/store/useDateStore';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/Toast/ToastProvider';

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
  const { showToast } = useToast();

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
      showToast('상태 변경에 실패했습니다 😞');
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
      
      showToast('할 일이 삭제되었습니다 🗑️');
    } catch (error) {
      console.error('삭제 실패:', error);
      showToast('할 일 삭제에 실패했습니다 😞');
    }
  };

  const handlePostpone = async () => {
    if (!confirm('이 할 일을 보류함으로 이동하시겠습니까?')) {
      return;
    }

    try {
      console.log('📦 보류 처리 시작:', task.title);
      await moveToArchive(task.id);
      
      // 현재 날짜 캐시에서 제거
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', dateKey], (old: Task[] = []) => {
        return old.filter(t => t.id !== task.id);
      });
      
      // 모든 tasks 쿼리 무효화 (안전한 방법)
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      console.log('✅ 보류 처리 완료');
      showToast('할 일이 보류함으로 이동되었습니다 📦');
    } catch (error) {
      console.error('❌ 보류 처리 실패:', error);
      showToast('할 일 보류에 실패했습니다 😞');
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <Checkbox
        checked={task.status === 'success'}
        onCheckedChange={handleToggleStatus}
        variant={task.priority}
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={clsx(
            'text-sm font-medium',
            task.status === 'success' ? 'line-through text-gray-500' : 'text-gray-900'
          )}>
            {task.title}
          </h3>
          {task.status === 'retry' && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
              RETRY
            </span>
          )}
        </div>
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
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
