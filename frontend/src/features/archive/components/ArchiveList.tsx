import React from 'react';
import ArchiveItem from './ArchiveItem';
import { ArchiveTask } from '../types';

interface Props {
  tasks: ArchiveTask[];
  onMenuClick: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMoveToToday?: (id: string) => void;
}

export default function ArchiveList({ tasks, onMenuClick, onEdit, onDelete, onMoveToToday }: Props) {
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <ArchiveItem
          key={task.id}
          task={task}
          onMenuClick={onMenuClick}
          onEdit={onEdit ? () => onEdit(task.id) : undefined}
          onDelete={onDelete ? () => onDelete(task.id) : undefined}
          onMoveToToday={onMoveToToday ? () => onMoveToToday(task.id) : undefined}
        />
      ))}
    </div>
  );
} 