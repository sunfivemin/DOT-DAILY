import { TitleFormatDate } from '../features/retrospect/types/retrospect';
import { DailyEmotionMemo } from "../features/retrospect/types/retrospect";

export const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const titleFormat = (titleDate: TitleFormatDate) => {
  const month = titleDate.date.month + 1;
  const paddedMonth = month < 10 ? `0${month}` : month;
  return `${titleDate.date.year}. ${paddedMonth}`;
};

export const formatDisplayDate = (date: Date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
};

export const calculateConsecutiveDays = (emotionMemos: DailyEmotionMemo[]): number => {
  if (emotionMemos.length === 0) {
    return 0;
  }

  const sortedMemos = [...emotionMemos].sort((a, b) => a.date.getTime() - b.date.getTime());

  let streak = 0;
  let currentStreak = 0;
  let lastDate: Date | null = null;

  for (const memo of sortedMemos) {
    if (lastDate === null) {
      currentStreak = 1;
    } else {
      const diffTime = Math.abs(memo.date.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) { // 연속된 날짜인 경우
        currentStreak++;
      } else if (diffDays > 1) { // 연속이 끊긴 경우
        currentStreak = 1;
      }
    }
    lastDate = memo.date;
    streak = Math.max(streak, currentStreak);
  }

  return streak;
};