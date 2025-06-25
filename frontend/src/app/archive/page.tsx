'use client';

import React, { useState } from 'react';
import { ArchiveList } from '@/features/archive/components';
import { ArchiveTask } from '@/features/archive/types';
import MobileLayout from '@/components/layout/MobileLayout';

const mockTasks: ArchiveTask[] = [
  { id: '1', title: '5.30일 강의 완강', priority: 1, retryCount: 3, dueDate: '25.05.30' },
  { id: '2', title: '조카 생일선물 사기', priority: 3, retryCount: 0, dueDate: '25.05.27' },
  { id: '3', title: 'TS 책 5장 실습하고 블로그에 쓰기', priority: 2, retryCount: 0, dueDate: '25.05.22' },
  { id: '4', title: 'JS 책 10장~15장 블로그에 쓰기', priority: 2, retryCount: 0, dueDate: '25.05.12' },
  { id: '5', title: '휴대폰 백업하기', priority: 1, retryCount: 1, dueDate: '25.05.01' },
];

export default function ArchivePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedId(id);
    // TODO: 수정 모달 등
  };
  const handleDelete = (id: string) => {
    setSelectedId(id);
    // TODO: 삭제 확인 등
  };
  const handleMoveToToday = (id: string) => {
    setSelectedId(id);
    // TODO: 오늘 할 일로 이동
  };

  return (
    <MobileLayout headerTitle="보류함">
      <div className="px-4 py-6 space-y-2 pb-24">
        <ArchiveList
          tasks={mockTasks}
          onMenuClick={() => {}}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMoveToToday={handleMoveToToday}
        />
      </div>
    </MobileLayout>
  );
}
