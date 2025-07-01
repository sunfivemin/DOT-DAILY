'use client';

import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { clsx } from 'clsx';
import { useDateStore } from '@/store/useDateStore';
import { useQueryClient } from '@tanstack/react-query';
import { getTasksByDate } from '@/lib/api/tasks';

// 각 날짜 아이템을 렌더링하는 내부 컴포넌트
function DateItem({
  date,
  isSelected,
  onSelect,
}: {
  date: Date;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isToday = isSameDay(date, new Date());
  const queryClient = useQueryClient();

  const prefetchTasks = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['tasks', date.toISOString().split('T')[0]],
      queryFn: () => getTasksByDate(date),
    });
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={prefetchTasks}
      className={clsx(
        'flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all cursor-pointer',
        isSelected
          ? 'bg-surface-card shadow-sm' // 선택되면 흰색 배경 + 그림자
          : 'bg-transparent' // 선택되지 않으면 투명
      )}
    >
      <span
        className={clsx(
          'text-xl font-bold',
          isSelected ? 'text-text-strong' : 'text-text-weak' // 선택 여부에 따라 텍스트 색상 변경
        )}
      >
        {format(date, 'd')}
      </span>
      <span
        className={clsx(
          'text-xs font-medium',
          isSelected ? 'text-text-strong' : 'text-text-weak'
        )}
      >
        {isToday ? '오늘' : format(date, 'E', { locale: ko })}
      </span>
    </div>
  );
}

export default function DateHeader() {
  const { selectedDate, setSelectedDate } = useDateStore();

  const getDates = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(selectedDate.getDate() - 1);

    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1);

    return [prevDate, selectedDate, nextDate];
  };

  const dates = getDates();

  return (
    // 전체 배경은 앱의 기본 배경색(surface-base)과 동일하게 맞춥니다.
    <div className="flex items-center justify-around py-3 px-2 bg-surface-base">
      {dates.map((date, index) => (
        <DateItem
          key={index}
          date={date}
          isSelected={isSameDay(date, selectedDate)}
          onSelect={() => setSelectedDate(date)}
        />
      ))}
    </div>
  );
} 