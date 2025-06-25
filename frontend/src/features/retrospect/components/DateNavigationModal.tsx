'use client';

import { useRetrospectStore } from '@/store/useRestrospectStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface DateNavigationModalProps {
  onClose: () => void;
}

export default function DateNavigationModal({
  onClose
}: DateNavigationModalProps) {
  const { selectedYearMonth, setSelectedYearMonth } = useRetrospectStore();
  const [selectedYear, setSelectedYear] = useState(selectedYearMonth.year);
  const [selectedMonth, setSelectedMonth] = useState(selectedYearMonth.month);

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const onPrevYear = () => setSelectedYear(prev => prev - 1);
  const onNextYear = () => setSelectedYear(prev => prev + 1);

  const onDateSelect = (month: number) => {
    setSelectedMonth(month);
    setSelectedYearMonth({ year: selectedYear, month });
    onClose();
  };

  return (
    <motion.div
      key="retrospect-modal"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="
        absolute z-10
        bottom-[80px]
        w-full
        h-1/2
        bg-white
        px-4 py-6
        rounded-t-3xl
        "
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">월 선택</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img src="/close.svg" alt="닫기" />
        </button>
      </div>

      <div className="flex items-center justify-between py-6">
        <button
          onClick={onPrevYear}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img src="/left.svg" alt="왼쪽" />
        </button>

        <div className="text-xl font-bold">{selectedYear}년</div>

        <button
          onClick={onNextYear}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img src="/right.svg" alt="오른쪽" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {months.map((month) => (
          <div key={month} className='m-auto h-20'>
            <button
              onClick={() => onDateSelect(month)}
              className={`
              w-12 h-12
              rounded-full 
              font-medium
              ${selectedYear === selectedYearMonth.year && selectedMonth === month
                  ? 'bg-brand-primary text-white'
                  : 'text-gray-900 hover:bg-gray-100'
                }
            `}
            >
              {month}월
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
