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
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // 우선순위별로 할 일 그룹화 (안전하게 처리)
  const groupedTasks: Record<'must' | 'should' | 'remind', Task[]> = {
    must: [],
    should: [],
    remind: [],
  };

  // tasks가 배열인지 확인하고 그룹화
  if (Array.isArray(tasks)) {
    tasks.forEach(task => {
      if (task.priority && groupedTasks[task.priority]) {
        groupedTasks[task.priority].push(task);
      }
    });
  }

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setOpen(true);
    setDefaultPriority(task.priority);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTask(null);
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <MobileLayout headerTitle="나의 하루" showFab={false}>
        <div className="px-4 py-6">
          <DateHeader />
          <TaskListSkeleton />
        </div>
      </MobileLayout>
    );
  }

  // 에러 발생 시
  if (isError) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isTimeoutError = errorMessage.includes('timeout') || errorMessage.includes('ECONNABORTED');
    
    return (
      <MobileLayout headerTitle="나의 하루" showFab={false}>
        <div className="px-4 py-6">
          <DateHeader />
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isTimeoutError ? '서버 연결 중...' : '데이터를 불러올 수 없습니다'}
            </h3>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed whitespace-pre-line">
              {isTimeoutError 
                ? '서버가 시작되고 있습니다.\n첫 접속 시 1-2분 정도 걸릴 수 있어요.' 
                : '네트워크 연결을 확인하고\n다시 시도해주세요.'
              }
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout headerTitle="나의 하루">
      <div className="sticky top-0 z-10 bg-surface-base">
        <DateHeader />
      </div>

      <div className="px-4 py-6 space-y-8 ">
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
              데이터를 불러올 수 없습니다. 다시 시도해주세요.
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
          task={editTask || undefined}
          defaultPriority={defaultPriority}
        />
      </FullScreenModal>
    </MobileLayout>
  );
}
