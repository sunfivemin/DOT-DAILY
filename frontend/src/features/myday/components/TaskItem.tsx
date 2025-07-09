'use client';

import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { MoreHorizontal, Pencil, Trash2, CalendarClock } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import { deleteTask, Task, toggleTaskStatus, moveToArchive } from '@/lib/api/tasks';
import { format } from 'date-fns';
import { useDateStore } from '@/store/useDateStore';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/Toast/ToastProvider';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

// 완료 시 파티클 효과 컴포넌트
const CompletionParticles = ({ show }: { show: boolean }) => {
  const particles = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((index) => {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            const randomRotate = Math.random() * 360;
            const emojis = ['✨', '🎉', '⭐'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            return (
              <motion.div
                key={index}
                className="absolute text-sm"
                style={{ 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1, 
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  x: randomX, 
                  y: randomY, 
                  opacity: 0, 
                  scale: 1,
                  rotate: randomRotate 
                }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.1,
                  ease: "easeOut" 
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
};

export default function TaskItem({
  task,
  onEdit = () => {},
}: TaskItemProps) {
  const queryClient = useQueryClient();
  const { selectedDate } = useDateStore();
  const { showToast } = useToast();
  const [showParticles, setShowParticles] = useState(false);

  const handleToggleStatus = async () => {
    // 현재 상태를 미리 저장 (클로저로 보존)
    const originalStatus = task.status;
    
    try {
      console.log('🔄 체크박스 클릭:', {
        taskId: task.id,
        currentStatus: originalStatus,
        title: task.title
      });
      
      // 서버에 실제 요청 (원래 상태 전달)
      const updatedTask = await toggleTaskStatus(task.id, originalStatus);
      
      console.log('✅ 서버 응답:', {
        id: updatedTask.id,
        title: updatedTask.title,
        newStatus: updatedTask.status
      });
      
      // 해당 날짜의 모든 할 일 목록 새로고침
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.invalidateQueries({ queryKey: ['tasks', dateKey] });
      
      // 상태에 따른 토스트 메시지와 파티클 효과
      if (updatedTask.status === 'success') {
        // 완료 시 파티클 효과 트리거
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
        showToast('할 일을 완료했습니다! 🎉');
      } else {
        showToast('할 일을 미완료로 변경했습니다 📝');
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
      showToast('상태 변경에 실패했습니다 😞');
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTask(task.id);
      
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', dateKey], (old: Task[]) => {
        return old?.filter(t => t.id !== task.id) || [];
      });
      
      showToast('할 일이 삭제되었습니다 🗑️');
    } catch (error) {
      console.error('삭제 실패:', error);
      showToast('할 일 삭제에 실패했습니다 😞');
    }
  };

  const handlePostpone = async () => {
    if (!confirm('이 할 일을 보류함으로 이동하시겠습니까?')) {
      return;
    }

    try {
      console.log('📦 보류 처리 시작:', task.title);
      await moveToArchive(task.id);
      
      // 현재 날짜 캐시에서 제거
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      queryClient.setQueryData(['tasks', dateKey], (old: Task[] = []) => {
        return old.filter(t => t.id !== task.id);
      });
      
      // 모든 tasks 쿼리 무효화 (안전한 방법)
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      console.log('✅ 보류 처리 완료');
      showToast('할 일이 보류함으로 이동되었습니다 📦');
    } catch (error) {
      console.error('❌ 보류 처리 실패:', error);
      showToast('할 일 보류에 실패했습니다 😞');
    }
  };

  return (
    <motion.div 
      className="relative flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 완료 시 파티클 효과 */}
      <CompletionParticles show={showParticles} />
      
      <Checkbox
        checked={task.status === 'success'}
        onCheckedChange={handleToggleStatus}
        variant={task.priority}
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <motion.h3 
            className={clsx(
              'text-sm font-medium transition-all duration-300',
              task.status === 'success' ? 'line-through text-gray-500' : 'text-gray-900'
            )}
            animate={task.status === 'success' ? { 
              scale: 1.02,
              opacity: 0.6
            } : { 
              scale: 1,
              opacity: 1
            }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            {task.title}
          </motion.h3>
          {task.status === 'retry' && (
            <motion.span 
              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              RETRY
            </motion.span>
          )}
        </div>
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right bg-surface-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onEdit(task)}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
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
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
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
                    'flex items-center w-full px-4 py-2 text-sm text-text-default',
                    active && 'bg-surface-hover'
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
    </motion.div>
  );
}
