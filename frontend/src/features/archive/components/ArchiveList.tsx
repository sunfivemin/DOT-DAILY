import React from 'react';
import ArchiveItem from './ArchiveItem';
// import { ArchiveTask } from '../types'; // 삭제
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useDateStore } from '@/store/useDateStore';

interface Props {
  tasks: any[]; // ArchiveTask[]에서 any[]로 임시 대체
  onMenuClick: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMoveToToday?: (id: string) => void;
}

export default function ArchiveList({ tasks, onMenuClick, onEdit, onDelete, onMoveToToday }: Props) {
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();
  const todayKey = format(selectedDate, 'yyyy-MM-dd');

  // 래핑하여 invalidateQueries 호출
  const handleMoveToToday = (id: string) => {
    if (onMoveToToday) onMoveToToday(id);
    queryClient.invalidateQueries({ queryKey: ['tasks', todayKey] });
    queryClient.invalidateQueries({ queryKey: ['archiveTasks'] });
  };

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <ArchiveItem
          key={task.id + '-' + task.dueDate}
          task={task}
          onMenuClick={onMenuClick}
          onEdit={onEdit ? () => onEdit(task.id) : undefined}
          onDelete={onDelete ? () => onDelete(task.id) : undefined}
          onMoveToToday={() => handleMoveToToday(task.id)}
        />
      ))}
    </div>
  );
} 