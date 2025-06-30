'use client';

import React, { useState } from 'react';
import { ArchiveList } from '@/features/archive/components';
import { ArchiveTask } from '@/features/archive/types';
import MobileLayout from '@/components/layout/MobileLayout';
import { archiveTasks, moveToTodayFromArchive, deleteArchiveTask, updateArchiveTask } from '@/lib/api/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useDateStore } from '@/store/useDateStore';
import BottomSheetModal from '@/components/ui/Modal/components/BottomSheetModal';

export default function ArchivePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState<1 | 2 | 3>(1);

  const handleEdit = async (id: string) => {
    setSelectedId(id);
    const task = archiveTasks.find(t => String(t.id) === id);
    if (!task) return;
    setEditTaskId(id);
    setEditTitle(task.title);
    setEditPriority(
      typeof task.priority === 'number'
        ? task.priority
        : task.priority === 'must'
        ? 1
        : task.priority === 'should'
        ? 2
        : 3
    );
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!editTaskId) return;
    try {
      // priority를 string으로 변환해서 저장
      const priorityStr = editPriority === 1 ? 'must' : editPriority === 2 ? 'should' : 'remind';
      await updateArchiveTask(Number(editTaskId), { title: editTitle, priority: priorityStr });
      setIsEditModalOpen(false);
      setForceUpdate(v => v + 1);
    } catch (error) {
      alert('수정에 실패했습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    setSelectedId(id);
    try {
      await deleteArchiveTask(Number(id));
      // 강제로 리렌더링 (archiveTasks는 메모리라 상태 변화 감지가 안 됨)
      setForceUpdate(v => v + 1);
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
  };
  const handleMoveToToday = async (id: string) => {
    setSelectedId(id);
    try {
      const movedTask = await moveToTodayFromArchive(Number(id));
      // 오늘 날짜 캐시 갱신
      const todayKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', todayKey], (old: any[] = []) => {
        return [...old, movedTask];
      });
      // 보류함 캐시는 자동으로 반영됨 (archiveTasks 배열 사용)
    } catch (error) {
      alert('오늘 할 일로 이동에 실패했습니다.');
    }
  };

  // archiveTasks를 ArchiveTask[]로 변환
  const archiveTaskList: ArchiveTask[] = archiveTasks.map(task => ({
    id: String(task.id),
    title: task.title,
    priority: task.priority === 'must' ? 1 : task.priority === 'should' ? 2 : 3,
    retryCount: task.retryCount,
    dueDate: task.date.slice(2).replace(/-/g, '.'),
  }));

  return (
    <MobileLayout headerTitle="보류함">
      <div className="px-4 py-6 space-y-2 pb-24">
        <ArchiveList
          tasks={archiveTaskList}
          onMenuClick={() => {}}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMoveToToday={handleMoveToToday}
        />
      </div>
      <BottomSheetModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="py-4">
          <div className="mb-4">
            <label className="block font-semibold mb-2">오늘의 할 일을 적어주세요</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="할 일 제목"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">우선순위</label>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-full border ${editPriority === 1 ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-red-500'}`}
                onClick={() => setEditPriority(1)}
              >1 무조건</button>
              <button
                className={`px-3 py-1 rounded-full border ${editPriority === 2 ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-500 border-emerald-500'}`}
                onClick={() => setEditPriority(2)}
              >2 오늘이면 굿</button>
              <button
                className={`px-3 py-1 rounded-full border ${editPriority === 3 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
                onClick={() => setEditPriority(3)}
              >3 잊지말자</button>
            </div>
          </div>
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold"
            onClick={handleEditSave}
            disabled={!editTitle.trim()}
          >
            저장하기
          </button>
        </div>
      </BottomSheetModal>
    </MobileLayout>
  );
}
