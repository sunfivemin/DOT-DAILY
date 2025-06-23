'use client';

import { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import TaskItem from '@/features/myday/components/TaskItem';
import TaskGroup from '@/features/myday/components/TaskGroup';
import { Plus } from 'lucide-react';
import Fab from '@/components/ui/Fab/Fab';
import DateHeader from '@/features/myday/components/DateHeader';

// 임시 데이터. 실제로는 API로부터 받아올 데이터입니다.
const initialTasks = {
  must: [
    { id: 'must-1', label: '6.2일 강의 완강', done: false, retryCount: 1 },
    { id: 'must-2', label: '투표하기', done: true },
    { id: 'must-3', label: '프로젝트 기획서 초안 작성', done: false },
    { id: 'must-4', label: '팀 회의 준비', done: false },
  ],
  should: [
    { id: 'should-1', label: '건전지 사기', done: false },
    { id: 'should-2', label: '회의내용 정리하기', done: true },
    { id: 'should-3', label: '운동화 세탁 맡기기', done: true },
    { id: 'should-4', label: '서점 들러서 책 찾아보기', done: false },
    { id: 'should-5', label: '점심 약속 장소 예약', done: true },
  ],
  remind: [
    { id: 'remind-1', label: '엄마한테 전화하기', done: false },
    { id: 'remind-2', label: '5km 러닝하기', done: true },
    { id: 'remind-3', label: 'OTT 구독 해지하기', done: false },
    { id: 'remind-4', label: '휴가 계획 세우기', done: false },
    { id: 'remind-5', label: '친구 생일 선물 주문', done: true },
    { id: 'remind-6', label: '영양제 챙겨먹기', done: true },
  ],
};

export default function MyDayPage() {
  const [tasks, setTasks] = useState(initialTasks);

  // Task의 완료 상태를 토글하는 함수
  const handleToggle = (priority: 'must' | 'should' | 'remind', id: string) => {
    setTasks(prev => ({
      ...prev,
      [priority]: prev[priority].map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      ),
    }));
  };

  return (
    <MobileLayout headerTitle="나의 하루">
      <div className="sticky top-0 z-10 bg-surface-base">
        <DateHeader />
      </div>

      <div className="px-4 py-6 space-y-8 pb-24">
        <TaskGroup priority="must" title="오늘 무조건">
          {tasks.must.map(task => (
            <TaskItem
              key={task.id}
              {...task}
              priority="must"
              onToggleStatus={() => handleToggle('must', task.id)}
            />
          ))}
        </TaskGroup>

        <TaskGroup priority="should" title="오늘이면 굿">
          {tasks.should.map(task => (
            <TaskItem
              key={task.id}
              {...task}
              priority="should"
              onToggleStatus={() => handleToggle('should', task.id)}
            />
          ))}
        </TaskGroup>

        <TaskGroup priority="remind" title="잊지말자">
          {tasks.remind.map(task => (
            <TaskItem
              key={task.id}
              {...task}
              priority="remind"
              onToggleStatus={() => handleToggle('remind', task.id)}
            />
          ))}
        </TaskGroup>
      </div>

      <div className="fixed bottom-[5.5rem] z-20 w-full max-w-md left-1/2 -translate-x-1/2 flex justify-end pr-4 pointer-events-none">
        <Fab aria-label="새로운 할 일 추가" className="pointer-events-auto">
          <Plus className="w-6 h-6" />
        </Fab>
      </div>
    </MobileLayout>
  );
}
