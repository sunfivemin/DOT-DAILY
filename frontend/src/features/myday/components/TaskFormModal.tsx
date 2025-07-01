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
import { format } from 'date-fns';

interface TaskFormModalProps {
  onClose: () => void;
  defaultDate?: string;
  task?: Task | null;
}

const inputSize: Size = 'md';

export default function TaskFormModal({
  onClose,
  defaultDate,
  task,
}: TaskFormModalProps) {
  const [label, setLabel] = useState(task ? task.title : '');
  const [priority, setPriority] = useState<'must' | 'should' | 'remind'>(task ? task.priority : 'must');
  const [date, setDate] = useState<Date | null>(task ? new Date(task.date) : (defaultDate ? new Date(defaultDate) : new Date()));
  const [isLoading, setIsLoading] = useState(false);
  
  const queryClient = useQueryClient();
  const dateKey = date ? format(date, 'yyyy-MM-dd') : '';

  const handleSubmit = async () => {
    if (!label.trim() || !date) {
      alert('할 일과 날짜를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      let newOrUpdatedTask: Task;
      if (task) {
        // 수정 모드
        newOrUpdatedTask = await updateTask(task.id, {
          title: label.trim(),
          priority,
          date: format(date, 'yyyy-MM-dd'),
        });
        queryClient.setQueryData(['tasks', dateKey], (old: Task[] | undefined) => {
          return old ? old.map((t: Task) => t.id === task.id ? newOrUpdatedTask : t) : [newOrUpdatedTask];
        });
      } else {
        // 등록 모드
        newOrUpdatedTask = await createTask({
          title: label.trim(),
          priority,
          date: format(date, 'yyyy-MM-dd'),
        });
        queryClient.setQueryData(['tasks', dateKey], (old: Task[] | undefined) => {
          return old ? [...old, newOrUpdatedTask] : [newOrUpdatedTask];
        });
      }
      onClose();
    } catch (error) {
      console.error('할 일 저장 실패:', error);
      alert('할 일 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="task-form-modal"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="flex flex-col w-full flex-1"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <button onClick={onClose} aria-label="뒤로가기">
          <Image src="/back.svg" alt="back" width={20} height={20} style={{ width: 20, height: 20 }} />
        </button>
        <h2 className="text-sm text-gray-400">오늘 할 일</h2>
        <div className="w-6" />
      </div>

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
