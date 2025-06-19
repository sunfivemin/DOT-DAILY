'use client';

import { Input } from '@/components/ui/Input/Input';
import type { Size } from '@/components/ui/Input/Input';
import { DatePicker } from '@/components/ui/Input/DatePicker';
import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TaskFormModalProps {
  onClose: () => void;
  defaultDate?: string;
}

const priorities = [
  {
    value: 'must',
    label: '오늘 무조건',
    color: 'text-red-500',
    circle: 'bg-red-500',
  },
  {
    value: 'should',
    label: '오늘이면 굿',
    color: 'text-emerald-500',
    circle: 'bg-emerald-500',
  },
  {
    value: 'remind',
    label: '잊지말자',
    color: 'text-blue-500',
    circle: 'bg-blue-500',
  },
] as const;

const inputSize: Size = 'md';

export default function TaskFormModal({
  onClose,
  defaultDate,
}: TaskFormModalProps) {
  const [label, setLabel] = useState('');
  const [priority, setPriority] =
    useState<'must' | 'should' | 'remind'>('must');
  const [date, setDate] = useState<Date | null>(
    defaultDate ? new Date(defaultDate) : new Date()
  );

  return (
    <motion.div
      key="task-form-modal"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-0 z-[999] bg-white overflow-y-auto flex flex-col"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <button onClick={onClose} aria-label="뒤로가기">
          <Image src="/back.svg" alt="back" width={24} height={24} />
        </button>
        <h2 className="text-sm text-gray-400">오늘 할 일</h2>
        <div className="w-6" />
      </div>

      <div className="flex-1 px-6 py-4 space-y-6">
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
            {priorities.map(p => (
              <label key={p.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={p.value}
                  checked={priority === p.value}
                  onChange={() => setPriority(p.value)}
                />
                <div
                  className={`w-5 h-5 text-xs rounded-full text-white flex items-center justify-center ${p.circle}`}
                >
                  {p.value === 'must' ? '1' : p.value === 'should' ? '2' : '3'}
                </div>
                <span className={p.color}>{p.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">날짜를 선택해주세요</label>
          <DatePicker value={date} onChange={setDate} size="md" />
        </div>
      </div>

      <div className="sticky bottom-0 z-10 px-4 pb-6 pt-2 bg-white">
        <Button size="lg" variant="primary" className="w-full rounded-full">
          할 일 등록하기
        </Button>
      </div>
    </motion.div>
  );
}
