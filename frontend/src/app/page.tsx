'use client';

import { useQuery } from '@tanstack/react-query';
import MobileLayout from '@/components/layout/MobileLayout';
import {
  TaskItem,
  TaskGroup,
  DateHeader,
  TaskListSkeleton,
  TaskFormModal,
} from '@/features/myday/components';
import { Plus } from 'lucide-react';
import Fab from '@/components/ui/Fab/Fab';
import { useDateStore } from '@/store/useDateStore';
import { getTasksByDate, Task } from '@/lib/api/tasks';
import FullScreenModal from '@/components/ui/Modal/components/FullScreenModal';
import { useState } from 'react';
import type { Task as TaskType } from '@/lib/api/tasks';

export default function MyDayPage() {
  const { selectedDate } = useDateStore();
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);
  const [defaultPriority, setDefaultPriority] = useState<'must' | 'should' | 'remind'>('must');

  const queryKey = ['tasks', selectedDate.toISOString().split('T')[0]];

  const { data: tasks, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => getTasksByDate(selectedDate),
    refetchOnWindowFocus: true,
  });

  // 디버깅용 콘솔
  const todayKey = new Date().toISOString().split('T')[0];
  console.log('selectedDate:', selectedDate);
  console.log('todayKey:', todayKey);
  console.log('queryKey:', queryKey);
  console.log('tasks:', tasks);

  // 우선순위별로 할 일 그룹화
  const groupedTasks: Record<'must' | 'should' | 'remind', Task[]> = {
    must: [],
    should: [],
    remind: [],
    ...(tasks?.reduce((acc, task) => {
      if (!acc[task.priority]) {
        acc[task.priority] = [];
      }
      acc[task.priority].push(task);
      return acc;
    }, {} as Record<'must' | 'should' | 'remind', Task[]>) || {})
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setOpen(true);
    setDefaultPriority(task.priority);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTask(null);
  };

  return (
    <MobileLayout headerTitle="나의 하루">
      <div className="sticky top-0 z-10 bg-surface-base">
        <DateHeader />
      </div>

      <div className="px-4 py-6 space-y-8 pb-24">
        {isLoading ? (
          <>
            <TaskGroup priority="must" title="오늘 무조건">
              <TaskListSkeleton />
            </TaskGroup>
            <TaskGroup priority="should" title="오늘이면 굿">
              <TaskListSkeleton />
            </TaskGroup>
            <TaskGroup priority="remind" title="잊지말자">
              <TaskListSkeleton />
            </TaskGroup>
          </>
        ) : (
          <>
            {isError && (
              <div className="text-center py-10">
                <p className="text-danger-solid">
                  오류가 발생했습니다: {error.message}
                </p>
              </div>
            )}
            <TaskGroup
              priority="must"
              title="오늘 무조건"
              onEmptyClick={() => {
                setEditTask(null);
                setDefaultPriority('must');
                setOpen(true);
              }}
            >
              {groupedTasks.must.length > 0
                ? groupedTasks.must.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                    />
                  ))
                : null}
            </TaskGroup>
            <TaskGroup
              priority="should"
              title="오늘이면 굿"
              onEmptyClick={() => {
                setEditTask(null);
                setDefaultPriority('should');
                setOpen(true);
              }}
            >
              {groupedTasks.should.length > 0
                ? groupedTasks.should.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                    />
                  ))
                : null}
            </TaskGroup>
            <TaskGroup
              priority="remind"
              title="잊지말자"
              onEmptyClick={() => {
                setEditTask(null);
                setDefaultPriority('remind');
                setOpen(true);
              }}
            >
              {groupedTasks.remind.length > 0
                ? groupedTasks.remind.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                    />
                  ))
                : null}
            </TaskGroup>
          </>
        )}
      </div>

      <div className="fixed bottom-[5.5rem] z-20 w-full max-w-md left-1/2 -translate-x-1/2 flex justify-end pr-4 pointer-events-none">
        <Fab aria-label="새로운 할 일 추가" className="pointer-events-auto" onClick={() => setOpen(true)}>
          <Plus className="w-6 h-6" />
        </Fab>
      </div>
      <FullScreenModal open={open} onClose={handleClose}>
        <TaskFormModal
          onClose={handleClose}
          defaultDate={selectedDate.toISOString().split('T')[0]}
          task={editTask}
          defaultPriority={defaultPriority}
        />
      </FullScreenModal>
    </MobileLayout>
  );
}
