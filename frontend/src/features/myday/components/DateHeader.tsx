'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { clsx } from 'clsx';

// 각 날짜 아이템을 렌더링하는 내부 컴포넌트
function DateItem({
  date,
  isSelected,
}: {
  date: Date;
  isSelected: boolean;
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all',
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
        {isSelected ? '오늘' : format(date, 'E', { locale: ko })}
      </span>
    </div>
  );
}

export default function DateHeader() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return (
    // 전체 배경은 앱의 기본 배경색(surface-base)과 동일하게 맞춥니다.
    <div className="flex items-center justify-around py-3 px-2 bg-surface-base">
      <DateItem date={yesterday} isSelected={false} />
      <DateItem date={today} isSelected={true} />
      <DateItem date={tomorrow} isSelected={false} />
    </div>
  );
} 