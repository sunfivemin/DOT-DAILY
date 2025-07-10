"use client";

import React, { useState, useMemo } from "react";
import { Menu } from "@headlessui/react";
import { MoreHorizontal, Pencil, Trash2, CalendarClock } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import {
  deleteTask,
  Task,
  toggleTaskStatus,
  moveToArchive,
} from "@/lib/api/tasks";

import { useDateStore } from "@/store/useDateStore";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/Toast/ToastProvider";
import { useConfirm } from "@/components/ui/Modal/providers/ModalProvider";

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

// 완료 시 파티클 효과 컴포넌트 - 메모이제이션 적용
const CompletionParticles = React.memo(({ show }: { show: boolean }) => {
  const particles = useMemo(() => Array.from({ length: 4 }, (_, i) => i), []);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((index) => {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            const randomRotate = Math.random() * 360;
            const emojis = ["✨", "🎉", "⭐"];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];

            return (
              <motion.div
                key={index}
                className="absolute text-sm"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: randomX,
                  y: randomY,
                  opacity: 0,
                  scale: 1,
                  rotate: randomRotate,
                }}
                transition={{
                  type: "tween",
                  duration: 0.8,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                {emoji}
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
});

CompletionParticles.displayName = "CompletionParticles";

const TaskItem = React.memo(function TaskItem({
  task,
  onEdit = () => {},
}: TaskItemProps) {
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();
  const { showToast } = useToast();
  const [showParticles, setShowParticles] = useState(false);
  const confirm = useConfirm();

  const handleToggleStatus = async () => {
    const originalStatus = task.status;

    try {
      console.log("🔄 체크박스 클릭:", {
        taskId: task.id,
        currentStatus: originalStatus,
        title: task.title,
      });

      const updatedTask = await toggleTaskStatus(task.id, originalStatus);

      console.log("✅ 서버 응답:", {
        id: updatedTask.id,
        title: updatedTask.title,
        newStatus: updatedTask.status,
      });

      const dateKey = selectedDate.toISOString().split("T")[0];
      queryClient.invalidateQueries({ queryKey: ["tasks", dateKey] });

      if (updatedTask.status === "success") {
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
        showToast("할 일을 완료했습니다! 🎉");
      } else {
        showToast("할 일을 미완료로 변경했습니다 📝");
      }
    } catch (error) {
      console.error("상태 변경 실패:", error);
      showToast("상태 변경에 실패했습니다 😞");
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirm("정말로 이 할 일을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteTask(task.id);

      const dateKey = selectedDate.toISOString().split("T")[0];
      queryClient.setQueryData(["tasks", dateKey], (old: Task[]) => {
        return old?.filter((t) => t.id !== task.id) || [];
      });

      showToast("할 일이 삭제되었습니다 🗑️");
    } catch (error) {
      console.error("삭제 실패:", error);
      showToast("할 일 삭제에 실패했습니다 😞");
    }
  };

  const handlePostpone = async () => {
    const confirmed = await confirm("이 할 일을 보류함으로 이동하시겠습니까?");
    if (!confirmed) return;

    try {
      await moveToArchive(task.id);

      const dateKey = selectedDate.toISOString().split("T")[0];
      // 1. MyDay 캐시에서 즉시 제거 (optimistic)
      queryClient.setQueryData(["tasks", dateKey], (old: Task[] = []) =>
        old.filter((t) => t.id !== task.id)
      );

      // 2. 보류함만 invalidate (MyDay는 setQueryData로 이미 반영됨)
      await queryClient.invalidateQueries({ queryKey: ["archiveTasks"] });

      showToast("할 일이 보류함으로 이동되었습니다 📦");
    } catch {
      showToast("할 일 보류에 실패했습니다 😞");
    }
  };

  const titleClassName = useMemo(
    () =>
      clsx(
        "text-sm font-medium transition-colors duration-200",
        task.status === "success"
          ? "line-through text-gray-500"
          : "text-gray-900"
      ),
    [task.status]
  );

  return (
    <div className="relative flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm will-change-auto">
      <CompletionParticles show={showParticles} />

      <div className="flex-shrink-0">
        <Checkbox
          checked={task.status === "success"}
          onCheckedChange={handleToggleStatus}
          variant={task.priority}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={titleClassName}>{task.title}</h3>
          {task.status === "retry" && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold whitespace-nowrap">
              RETRY
            </span>
          )}
        </div>
      </div>

      <div className="flex-shrink-0">
        <Menu as="div" className="relative">
          <Menu.Button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-50 mt-2 min-w-[120px] w-32 max-w-[90vw] origin-top-right bg-surface-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onEdit(task)}
                    className={clsx(
                      "flex items-center w-full px-4 py-2 text-sm text-text-default transition-colors",
                      active && "bg-surface-hover"
                    )}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    수정
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleDelete}
                    className={clsx(
                      "flex items-center w-full px-4 py-2 text-sm text-text-default transition-colors",
                      active && "bg-surface-hover"
                    )}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    삭제
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handlePostpone}
                    className={clsx(
                      "flex items-center w-full px-4 py-2 text-sm text-text-default transition-colors",
                      active && "bg-surface-hover"
                    )}
                  >
                    <CalendarClock className="w-4 h-4 mr-2" />
                    보류
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
});

export default React.memo(TaskItem);
