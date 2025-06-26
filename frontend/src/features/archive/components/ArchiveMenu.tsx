import React from 'react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onMoveToToday: () => void;
}

export default function ArchiveMenu({ onEdit, onDelete, onMoveToToday }: Props) {
  return (
    <div className="absolute right-4 top-0 mt-2 w-44 bg-surface-popup rounded-xl shadow-lg p-2 z-50 border border-border-popup">
      <button className="flex items-center gap-2 w-full py-2 px-3 hover:bg-surface-hover text-text-default" onClick={onEdit}>
        ✏️ <span>수정</span>
      </button>
      <button className="flex items-center gap-2 w-full py-2 px-3 hover:bg-surface-hover text-text-default" onClick={onDelete}>
        🗑️ <span>삭제</span>
      </button>
      <button className="flex items-center gap-2 w-full py-2 px-3 hover:bg-surface-hover text-text-default" onClick={onMoveToToday}>
        📅 <span>오늘 할 일로 이동</span>
      </button>
    </div>
  );
} 