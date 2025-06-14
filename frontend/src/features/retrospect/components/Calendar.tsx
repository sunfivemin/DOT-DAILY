'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { DayCellContentArg } from '@fullcalendar/core';
import './Calendar.css';
import { getDailyEmojiMemos } from '../api';
import { DailyEmojiMemo } from '../types/retrospect';
import { formatDateToString, titleFormat } from '../utils';

interface CalendarProps {
  onDateSelect: (date: Date, emoji: string, memo: string) => void;
}

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [emojiMemoList, setEmojiMemoList] = useState<DailyEmojiMemo[]>([]);

  const headerToolbar = useMemo(() => ({
    start: "title",
    center: "",
    // end: "prev next"
    end: ""
  }), []);

  const onDateClick = (dateInfo: DateClickArg) => {
    const clickedDate = formatDateToString(dateInfo.date);
    setSelectedDate(clickedDate);

    const selectedItem = emojiMemoList.find(item => formatDateToString(item.date) === clickedDate);
    const selectedEmoji = selectedItem?.emoji || '';
    const selectedMemo = selectedItem?.memo || '';

    if (onDateSelect) {
      onDateSelect(dateInfo.date, selectedEmoji, selectedMemo);
    }
  };

  const emojiByDateMap = useMemo(() => {
    return emojiMemoList.reduce((acc, item) => {
      acc[formatDateToString(item.date)] = item.emoji;
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

  useEffect(() => {
    const getEmojiMemos = async () => {
      const data = await getDailyEmojiMemos();
      setEmojiMemoList(data);
    };
    getEmojiMemos();
  }, []);

  return (
    <section aria-label="회고 캘린더">
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
    </section>
  );
};

export default Calendar;
