'use client';

import { Input } from '@/components/ui/Input/Input';
import type { Size } from '@/components/ui/Input/Input';
import { DatePicker } from '@/components/ui/Input/DatePicker';
import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RadioButton from '@/components/ui/Radio/RadioButton';
import { createTask, updateTask, Task } from '@/lib/api/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/components/ui/Toast/ToastProvider';

interface TaskFormModalProps {
  onClose: () => void;
  defaultDate?: string;
  task?: Task;
  defaultPriority?: 'must' | 'should' | 'remind';
}

const inputSize: Size = 'md';

// 날짜 파싱 헬퍼 함수
const parseDate = (dateString: string): Date => {
  try {
    return parseISO(dateString);
  } catch {
    return new Date();
  }
};

export default function TaskFormModal({
  onClose,
  defaultDate,
  task,
  defaultPriority = 'must',
}: TaskFormModalProps) {
  const [label, setLabel] = useState(task ? task.title : '');
  const [priority, setPriority] = useState<'must' | 'should' | 'remind'>(task ? task.priority : defaultPriority);
  const [date, setDate] = useState<Date | null>(
    task ? new Date(task.date) : (defaultDate ? parseDate(defaultDate) : new Date())
  );
  const [isLoading, setIsLoading] = useState(false);
  
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (!label.trim() || !date) {
      alert('할 일과 날짜를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      const taskData = {
        title: label.trim(),
        priority,
        date: format(date, 'yyyy-MM-dd'),
      };
      
      console.log('📝 할 일 저장 시도:', taskData);
      
      let newOrUpdatedTask: Task;
      if (task) {
        // 수정 모드
        console.log('✏️ 수정 모드:', task.id);
        newOrUpdatedTask = await updateTask(task.id, taskData);
        showToast('할 일이 수정되었습니다! ✏️');
      } else {
        // 등록 모드
        console.log('➕ 등록 모드');
        newOrUpdatedTask = await createTask(taskData);
        showToast('새로운 할 일이 등록되었습니다! ✅');
      }
      
      console.log('✅ 할 일 저장 성공:', newOrUpdatedTask);
      
      // React Query 캐시 무효화 (모든 tasks 쿼리 새로고침)
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      onClose();
    } catch (error) {
      console.error('❌ 할 일 저장 실패:', error);
      showToast('할 일 저장에 실패했습니다 😭');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="task-form-modal"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, ease: 'easeOut' }}
      className="flex flex-col w-full flex-1"
    >
      <motion.div 
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 cursor-grab"
        drag="y"
        dragElastic={0.1}
        dragConstraints={{ top: 0, bottom: 150 }}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80) {
            onClose();
          }
        }}
      >
        <button onClick={onClose} aria-label="뒤로가기">
          <Image src="/back.svg" alt="back" width={20} height={20} style={{ width: 20, height: 20 }} />
        </button>
        <h2 className="text-sm text-gray-400">오늘 할 일</h2>
        <div className="w-6" />
      </motion.div>

      <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
        <div>
          <label className="font-semibold">오늘 할 일을 적어주세요</label>
          <Input
            variant="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="뭘 할 건가요?"
            size={inputSize}
          />
        </div>

        <div>
          <label className="font-semibold">우선순위를 선택해주세요</label>
          <div className="space-y-3 mt-2">
            <RadioButton
              name="priority"
              value="must"
              variant="must"
              checked={priority === 'must'}
              onChange={() => setPriority('must')}
              label={
                <>
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-1 rounded-full bg-priority-must text-white text-xs font-bold text-center" style={{ lineHeight: '1.3rem' }}>1</span>
                  <span className="text-red-500">오늘 무조건</span>
                </>
              }
            />
            <RadioButton
              name="priority"
              value="should"
              variant="should"
              checked={priority === 'should'}
              onChange={() => setPriority('should')}
              label={
                <>
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-1 rounded-full bg-priority-should text-white text-xs font-bold text-center" style={{ lineHeight: '1.3rem' }}>2</span>
                  <span className="text-emerald-500">오늘이면 굿</span>
                </>
              }
            />
            <RadioButton
              name="priority"
              value="remind"
              variant="remind"
              checked={priority === 'remind'}
              onChange={() => setPriority('remind')}
              label={
                <>
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-1 rounded-full bg-priority-remind text-white text-xs font-bold text-center" style={{ lineHeight: '1.3rem' }}>3</span>
                  <span className="text-blue-500">잊지말자</span>
                </>
              }
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">날짜를 선택해주세요</label>
          <DatePicker value={date} onChange={setDate} size="md" />
        </div>
      </div>

      <div className="flex-none px-4 pb-6 pt-2 bg-white">
        <Button 
          size="lg" 
          variant="primary" 
          className="w-full rounded-full"
          onClick={handleSubmit}
          disabled={isLoading || !label.trim()}
        >
          {isLoading ? (task ? '수정 중...' : '등록 중...') : (task ? '수정하기' : '할 일 등록하기')}
        </Button>
      </div>
    </motion.div>
  );
}
