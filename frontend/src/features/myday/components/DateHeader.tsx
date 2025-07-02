'use client';

import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { clsx } from 'clsx';
import { useDateStore } from '@/store/useDateStore';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import React from 'react';

export default function DateHeader() {
  const { selectedDate, setSelectedDate } = useDateStore();

  const itemWidth = 100;
  const gap = 60;
  const centerIndex = 3;
  // 7개 날짜 배열 생성 (선택일 기준 앞뒤 3일)
  const getDates = () => {
    const arr = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(selectedDate);
      d.setDate(selectedDate.getDate() + i);
      arr.push(d);
    }
    return arr;
  };
  const dates = getDates();

  const x = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = async (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -itemWidth / 2) {
      setSelectedDate(dates[centerIndex + 1]);
    } else if (info.offset.x > itemWidth / 2) {
      setSelectedDate(dates[centerIndex - 1]);
    } else {
      await controls.start({ x: 0 });
    }
  };

  useEffect(() => {
    controls.start({ x: 0 });
    x.set(0);
  }, [selectedDate, controls, x]);

  return (
    <div className="relative w-full flex justify-center items-center py-3 px-2 overflow-x-hidden">
      <motion.div
        className="flex items-center justify-center w-full relative z-0"
        style={{ x, touchAction: 'pan-x', gap: `${gap}px` }}
        drag="x"
        dragElastic={0.2}
        animate={controls}
        onDragEnd={handleDragEnd}
      >
        {dates.map((date, idx) => {
          const isCenter = idx === centerIndex;
          return (
            <div
              key={idx}
              className={clsx(
                'flex flex-row items-center transition-all cursor-pointer',
                isCenter
                  ? 'bg-white text-text-strong rounded-2xl px-7 py-3 shadow-md shadow-black/10 font-bold text-lg overflow-visible'
                  : 'text-gray-400 font-medium text-base',
              )}
              style={{ minWidth: isCenter ? 80 : 60, opacity: isCenter ? 1 : 0.5, justifyContent: 'center' }}
              onClick={() => setSelectedDate(date)}
            >
              <span className="mr-2 whitespace-nowrap">{format(date, 'M.d')}</span>
              <span className={isCenter ? 'whitespace-nowrap' : ''}>{isSameDay(date, new Date()) ? '오늘' : format(date, 'E', { locale: ko })}</span>
            </div>
          );
        })}
      </motion.div>
      {/* 좌우 그라데이션 오버레이 - 배경색, width를 w-16(64px)으로 약간 더 길게 */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10" style={{background: 'linear-gradient(to right, #f8fafc 70%, transparent)'}} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10" style={{background: 'linear-gradient(to left, #f8fafc 70%, transparent)'}} />
    </div>
  );
} 