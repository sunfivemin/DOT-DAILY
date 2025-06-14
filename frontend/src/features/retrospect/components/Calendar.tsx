'use client';

import { useCallback, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { DayCellContentArg } from '@fullcalendar/core';
import './Calendar.css';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

interface DailyEmojiMemo {
  date: string;
  emoji: string;
  memo: string;
}

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [emojiMemoList, setEmojiMemoList] = useState<DailyEmojiMemo[]>([
    { date: '2025-06-23', emoji: 'great', memo: '오늘은 정말 좋은 하루였다!' },
    { date: '2025-06-24', emoji: 'bad', memo: '새로운 프로젝트를 시작했다.' },
    { date: '2025-06-25', emoji: 'appreciate', memo: '친구와 맛있는 저녁을 먹었다.' },
    { date: '2025-06-12', emoji: 'good', memo: '운동을 열심히 했다.' },
    { date: '2025-06-13', emoji: 'bad', memo: '책을 한 권 다 읽었다.' },
    { date: '2025-06-17', emoji: 'great', memo: '업무를 모두 마무리했다.' },
    { date: '2025-06-19', emoji: 'soso', memo: '산책하며 힐링했다.' },
    { date: '2025-06-30', emoji: 'soso', memo: '한 달을 잘 마무리했다.' },
    { date: '2025-06-26', emoji: 'bad', memo: '' },
    { date: '2025-06-27', emoji: 'appreciate', memo: '' },
    { date: '2025-06-28', emoji: 'great', memo: '' },
    { date: '2025-06-29', emoji: 'good', memo: '' }
  ]);

  const headerToolbar = useMemo(() => ({
    start: "title",
    center: "",
    end: "prev next"
  }), []);

  const titleFormat = (date: any) => {
    const month = date.date.month + 1;
    const paddedMonth = month < 10 ? `0${month}` : month;
    return `${date.date.year}.${paddedMonth}`;
  };

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onDateClick = (dateInfo: DateClickArg) => {
    const clickedDate = formatDateToString(dateInfo.date);
    setSelectedDate(clickedDate);

    if (onDateSelect) {
      onDateSelect(dateInfo.date);
    }
  };

  const emojiByDateMap = useMemo(() => {
    return emojiMemoList.reduce((acc, item) => {
      acc[item.date] = item.emoji;
      return acc;
    }, {} as Record<string, string>);
  }, [emojiMemoList]);

  const onDayCellClassNames = useCallback((dayCell: DayCellContentArg) => {
    const classes = [];
    const dateStr = formatDateToString(dayCell.date);

    if (dateStr === selectedDate) {
      classes.push('selected');
    }

    const emojiType = emojiByDateMap[dateStr];
    if (emojiType) {
      classes.push(`emoji-${emojiType}`);
    }

    return classes;
  }, [selectedDate, emojiByDateMap]);

  const onDayCellContent = (e: DayCellContentArg) => {
    return e.dayNumberText.replace('일', '');
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="ko"
      height="auto"
      headerToolbar={headerToolbar}
      titleFormat={titleFormat}
      dateClick={onDateClick}
      dayCellClassNames={onDayCellClassNames}
      dayCellContent={onDayCellContent}
      showNonCurrentDates={false}
      fixedWeekCount={false}
    />
  );
};

export default Calendar;
