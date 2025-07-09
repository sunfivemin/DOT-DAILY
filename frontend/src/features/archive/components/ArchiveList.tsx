import React from "react";
import ArchiveItem from "./ArchiveItem";
// import { ArchiveTask } from '../types'; // 삭제
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useDateStore } from "@/store/useDateStore";

interface ArchiveTask {
  id: string;
  title: string;
  priority: 1 | 2 | 3;
  retryCount: number;
  dueDate: string;
}

interface Props {
  tasks: ArchiveTask[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMoveToToday?: (id: string) => void;
}

export default function ArchiveList({
  tasks,
  onEdit,
  onDelete,
  onMoveToToday,
}: Props) {
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();
  const todayKey = format(selectedDate, "yyyy-MM-dd");

  // 래핑하여 invalidateQueries 호출
  const handleMoveToToday = (id: string) => {
    if (onMoveToToday) onMoveToToday(id);
    // 불필요한 invalidateQueries 제거
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed"
          style={{
            background: "rgba(188, 232, 241, 0.12)",
            borderColor: "#bce8f1",
          }}
        >
          <span className="mb-2 text-2xl">📂</span>
          <p className="font-kkonghae text-zinc-400 text-base">
            보류함이 비어있습니다.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <ArchiveItem
            key={task.id + "-" + task.dueDate}
            task={task}
            onEdit={onEdit ? () => onEdit(task.id) : undefined}
            onDelete={onDelete ? () => onDelete(task.id) : undefined}
            onMoveToToday={() => handleMoveToToday(task.id)}
          />
        ))
      )}
    </div>
  );
}
