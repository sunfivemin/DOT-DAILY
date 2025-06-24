'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MobileLayout from '@/components/layout/MobileLayout';
import TaskItem from '@/features/myday/components/TaskItem';
import TaskGroup from '@/features/myday/components/TaskGroup';
import { Plus } from 'lucide-react';
import Fab from '@/components/ui/Fab/Fab';
import DateHeader from '@/features/myday/components/DateHeader';
import { useDateStore } from '@/store/useDateStore';
import {
  getTasksByDate,
  updateTaskStatus,
  TaskPriority,
  Tasks,
} from '@/lib/api/tasks';
import TaskListSkeleton from '@/features/myday/components/TaskListSkeleton';
import FullScreenModal from '@/components/ui/Modal/FullScreenModal';
import TaskFormModal from '@/features/myday/components/TaskFormModal';
import { useState } from 'react';

export default function MyDayPage() {
  const { selectedDate } = useDateStore();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const queryKey = ['tasks', selectedDate.toISOString().split('T')[0]];

  const { data: tasks, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => getTasksByDate(selectedDate),
  });

  const { mutate: toggleTaskStatus } = useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async (variables) => {
      console.log('--- 낙관적 업데이트 시작 ---');
      console.log('1. 이전 쿼리 취소');
      await queryClient.cancelQueries({ queryKey });

      const previousTasks = queryClient.getQueryData<Tasks>(queryKey);
      console.log('2. UI 즉시 업데이트 (setQueryData)');

      if (previousTasks) {
        const newTasks = JSON.parse(JSON.stringify(previousTasks));
        const taskList: any[] = newTasks[variables.priority];
        const taskIndex = taskList.findIndex(task => task.id === variables.id);
        if (taskIndex !== -1) {
          taskList[taskIndex].done = variables.done;
        }
        queryClient.setQueryData<Tasks>(queryKey, newTasks);
      }
      
      console.log('3. 이전 데이터 저장 (롤백 대비)');
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      console.error('--- 🚨 낙관적 업데이트 실패! 롤백 실행 ---', err);
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKey, context.previousTasks);
      }
    },
    onSettled: () => {
      console.log('4. 최종 데이터 동기화 (invalidateQueries)');
      console.log('--- 낙관적 업데이트 종료 ---');
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleToggle = (priority: TaskPriority, id: string, done: boolean) => {
    toggleTaskStatus({ priority, id, done: !done });
  };

  return (
    <MobileLayout headerTitle="나의 하루">
      <div className="sticky top-0 z-10 bg-surface-base">
        <DateHeader />
      </div>

      <div className="px-4 py-6 space-y-8 pb-24">
        {isLoading && <TaskListSkeleton />}
        {isError && (
          <div className="text-center py-10">
            <p className="text-danger-solid">
              오류가 발생했습니다: {error.message}
            </p>
          </div>
        )}
        {tasks && (
          <>
            <TaskGroup priority="must" title="오늘 무조건">
              {tasks.must.map(task => (
                <TaskItem
                  key={task.id}
                  {...task}
                  priority="must"
                  onToggleStatus={() => handleToggle('must', task.id, task.done)}
                />
              ))}
            </TaskGroup>

            <TaskGroup priority="should" title="오늘이면 굿">
              {tasks.should.map(task => (
                <TaskItem
                  key={task.id}
                  {...task}
                  priority="should"
                  onToggleStatus={() =>
                    handleToggle('should', task.id, task.done)
                  }
                />
              ))}
            </TaskGroup>

            <TaskGroup priority="remind" title="잊지말자">
              {tasks.remind.map(task => (
                <TaskItem
                  key={task.id}
                  {...task}
                  priority="remind"
                  onToggleStatus={() =>
                    handleToggle('remind', task.id, task.done)
                  }
                />
              ))}
            </TaskGroup>
          </>
        )}
      </div>

      <div className="fixed bottom-[5.5rem] z-20 w-full max-w-md left-1/2 -translate-x-1/2 flex justify-end pr-4 pointer-events-none">
        <Fab aria-label="새로운 할 일 추가" className="pointer-events-auto" onClick={() => setOpen(true)}>
          <Plus className="w-6 h-6" />
        </Fab>
      </div>
      <FullScreenModal open={open} onClose={() => setOpen(false)}>
        <TaskFormModal onClose={() => setOpen(false)} defaultDate={selectedDate.toISOString().split('T')[0]} />
      </FullScreenModal>
    </MobileLayout>
  );
}
