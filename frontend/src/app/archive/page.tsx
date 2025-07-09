'use client';

import React, { useState } from 'react';
import { ArchiveList } from '@/features/archive/components';
import MobileLayout from '@/components/layout/MobileLayout';
import { getArchiveTasks, moveToTodayFromArchive, deleteArchiveTask, updateArchiveTask } from '@/lib/api/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useDateStore } from '@/store/useDateStore';
import BottomSheetModal from '@/components/ui/Modal/components/BottomSheetModal';
import { useToast } from '@/components/ui/Toast/ToastProvider';

interface ArchiveTask {
  id: string;
  title: string;
  priority: 1 | 2 | 3;
  retryCount: number;  // 📝 UI용 필드 (백엔드에는 없음)
  dueDate: string;     // 'YY.MM.DD'
  archivedDate?: string; // 보류된 시기 추가
}

export default function ArchivePage() {
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();
  const { showToast } = useToast();
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState<1 | 2 | 3>(1);

  const handleEdit = async (id: string) => {
    const archiveTasks = getArchiveTasks();
    const task = archiveTasks.find(t => String(t.id) === id);
    if (!task) return;
    setEditTaskId(id);
    setEditTitle(task.title);
    // ✅ Task 인터페이스의 priority는 이미 string이므로 변환 필요
    setEditPriority(
      task.priority === 'must' ? 1 : task.priority === 'should' ? 2 : 3
    );
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!editTaskId) return;
    try {
      let priorityStr: 'must' | 'should' | 'remind' = 'must';
      if (editPriority === 1) priorityStr = 'must';
      else if (editPriority === 2) priorityStr = 'should';
      else priorityStr = 'remind';
      await updateArchiveTask(Number(editTaskId), { title: editTitle, priority: priorityStr });
      setIsEditModalOpen(false);
      showToast('보류함 할 일이 수정되었습니다 ✏️');
    } catch {
      showToast('보류함 할 일 수정에 실패했습니다 😞');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArchiveTask(Number(id));
      showToast('보류함 할 일이 삭제되었습니다 🗑️');
    } catch {
      showToast('보류함 할 일 삭제에 실패했습니다 😞');
    }
  };

  const handleMoveToToday = async (id: string) => {
    try {
      await moveToTodayFromArchive(Number(id));
      const todayKey = format(selectedDate, 'yyyy-MM-dd');
      await queryClient.invalidateQueries({ queryKey: ['tasks', todayKey] });
      await queryClient.invalidateQueries({ queryKey: ['archiveTasks'] });
      showToast('오늘 할 일로 이동했습니다 📅');
    } catch {
      showToast('오늘 할 일로 이동에 실패했습니다 😞');
    }
  };

  const archiveTasks = getArchiveTasks();
  const today = new Date();
  const archiveTaskList: ArchiveTask[] = archiveTasks.map(task => ({
    id: String(task.id),
    title: task.title,
    priority: task.priority === 'must' ? 1 : task.priority === 'should' ? 2 : 3,
    retryCount: 0,  // 📝 임시값 (백엔드에 retryCount 필드가 없음)
    dueDate: task.date.slice(2).replace(/-/g, '.'),
    archivedDate: today.toISOString().slice(2, 10).replace(/-/g, '.'), // 현재 날짜를 보류된 시기로 설정
  }));

  return (
    <MobileLayout headerTitle="보류함">
      <div className="px-4 py-6 space-y-2">
        <ArchiveList
          tasks={archiveTaskList}
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
