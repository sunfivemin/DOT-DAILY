"use client";

import { useQuery } from "@tanstack/react-query";
import MobileLayout from "@/components/layout/MobileLayout";
import {
  TaskItem,
  TaskGroup,
  DateHeader,
  TaskListSkeleton,
  TaskFormModal,
} from "@/features/myday/components";
import { Plus } from "lucide-react";
import Fab from "@/components/ui/Fab/Fab";
import { useDateStore } from "@/store/useDateStore";
import { getTasksByDate, Task } from "@/lib/api/tasks";
import FullScreenModal from "@/components/ui/Modal/components/FullScreenModal";
import { useTaskCompletion } from "@/hooks/useTaskCompletion";
import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";

// 클라이언트 사이드에서만 로드
const CelebrationEffect = dynamic(
  () => import("@/components/ui/CelebrationEffect/CelebrationEffect"),
  { ssr: false }
);

export default function MyDayPage() {
  const { selectedDate } = useDateStore();
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);
  const [defaultPriority, setDefaultPriority] = useState<
    "must" | "should" | "remind"
  >("must");

  const queryKey = useMemo(
    () => ["tasks", selectedDate.toISOString().split("T")[0]],
    [selectedDate]
  );

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getTasksByDate(selectedDate),
    refetchOnWindowFocus: false, // 🔧 문제 해결: 포커스 시 자동 refetch 비활성화
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // 완료 축하 효과 훅
  const { showCelebration, hideCelebration } = useTaskCompletion({
    tasks: tasks || [],
  });

  // 우선순위별로 할 일 그룹화 (메모이제이션 적용)
  const groupedTasks = useMemo(() => {
    const result: Record<"must" | "should" | "remind", Task[]> = {
      must: [],
      should: [],
      remind: [],
    };

    // tasks가 배열인지 확인하고 그룹화
    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        if (task.priority && result[task.priority]) {
          result[task.priority].push(task);
        }
      });
    }

    return result;
  }, [tasks]);

  const handleEdit = useCallback((task: Task) => {
    setEditTask(task);
    setOpen(true);
    setDefaultPriority(task.priority);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setEditTask(null);
  }, []);

  const handleFabClick = useCallback(() => setOpen(true), []);

  const handleEmptyClick = useCallback(
    (priority: "must" | "should" | "remind") => {
      setEditTask(null);
      setDefaultPriority(priority);
      setOpen(true);
    },
    []
  );

  // 에러 메시지 메모이제이션
  const errorMessage = useMemo(() => {
    if (!isError) return null;
    const message = error instanceof Error ? error.message : String(error);
    return message.includes("timeout") || message.includes("ECONNABORTED")
      ? "timeout"
      : "error";
  }, [isError, error]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <MobileLayout headerTitle="나의 하루" showFab={false}>
        <div className="px-4 py-6">
          <DateHeader />
          <TaskListSkeleton />
        </div>
      </MobileLayout>
    );
  }

  // 에러 발생 시
  if (isError) {
    const isTimeoutError = errorMessage === "timeout";

    return (
      <MobileLayout headerTitle="나의 하루" showFab={false}>
        <div className="px-4 py-6">
          <DateHeader />
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isTimeoutError
                ? "서버 연결 중..."
                : "데이터를 불러올 수 없습니다"}
            </h3>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed whitespace-pre-line">
              {isTimeoutError
                ? "서버가 시작되고 있습니다.\n첫 접속 시 1-2분 정도 걸릴 수 있어요."
                : "네트워크 연결을 확인하고\n다시 시도해주세요."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout headerTitle="나의 하루">
      <div className="sticky top-0 z-10 bg-surface-base">
        <DateHeader />
      </div>

      <div className="px-4 py-6 space-y-8">
        <TaskGroup
          priority="must"
          title="오늘 무조건"
          onEmptyClick={() => handleEmptyClick("must")}
        >
          {groupedTasks.must.length > 0
            ? groupedTasks.must.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={handleEdit} />
              ))
            : null}
        </TaskGroup>

        <TaskGroup
          priority="should"
          title="오늘이면 굿"
          onEmptyClick={() => handleEmptyClick("should")}
        >
          {groupedTasks.should.length > 0
            ? groupedTasks.should.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={handleEdit} />
              ))
            : null}
        </TaskGroup>

        <TaskGroup
          priority="remind"
          title="잊지말자"
          onEmptyClick={() => handleEmptyClick("remind")}
        >
          {groupedTasks.remind.length > 0
            ? groupedTasks.remind.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={handleEdit} />
              ))
            : null}
        </TaskGroup>
      </div>

      <div className="fixed bottom-[5.5rem] z-20 w-full max-w-md left-1/2 -translate-x-1/2 flex justify-end pr-4 pointer-events-none">
        <Fab
          aria-label="새로운 할 일 추가"
          className="pointer-events-auto"
          onClick={handleFabClick}
        >
          <Plus className="w-6 h-6" />
        </Fab>
      </div>

      <FullScreenModal open={open} onClose={handleClose}>
        <TaskFormModal
          onClose={handleClose}
          defaultDate={selectedDate.toISOString().split("T")[0]}
          task={editTask || undefined}
          defaultPriority={defaultPriority}
        />
      </FullScreenModal>

      {/* 모든 할 일 완료 축하 효과 */}
      <CelebrationEffect show={showCelebration} onComplete={hideCelebration} />
    </MobileLayout>
  );
}
