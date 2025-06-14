'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { DayCellContentArg, DayCellMountArg } from '@fullcalendar/core';
import './Calendar.css';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [emojiMap, setEmojiMap] = useState<Record<string, string>>({
    '2025-06-23': 'good',
    '2025-06-24': 'bad',
    '2025-06-25': 'soso',
    '2025-06-12': 'good',
    '2025-06-13': 'good',
    '2025-06-17': 'soso',
    '2025-06-19': 'good',
    '2025-06-30': 'bad'
  });

  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onDateClick = (info: DateClickArg) => {
    const clickedDate = getLocalDateString(info.date);
    setSelectedDate(clickedDate);

    if (onDateSelect) {
      onDateSelect(info.date);
    }
  };

  const onDayCellClassNames = (arg: DayCellContentArg) => {
    const classes = [];
    const dateStr = getLocalDateString(arg.date);

    if (dateStr === selectedDate) {
      classes.push('selected');
    }

    const emojiType = emojiMap[dateStr];
    if (emojiType) {
      classes.push(`emoji-${emojiType}`);
    }

    return classes;
  };

  const onDayCellDidMount = (info: DayCellMountArg) => {
    const key = getLocalDateString(info.date);
    const kind = emojiMap[key];
    if (!kind) return;

    info.el.classList.add(`emoji-${kind}`);
  };

  const onDayCellContent = (e: DayCellContentArg) => {
    return e.dayNumberText.replace('일', '');
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="ko"
      height="auto"
      headerToolbar={{
        start: "title",
        center: "",
        end: "prev next"
      }}
      titleFormat={(date) => {
        const month = date.date.month + 1;
        const paddedMonth = month < 10 ? `0${month}` : month;
        return `${date.date.year}.${paddedMonth}`;
      }}
      dateClick={onDateClick}
      dayCellClassNames={onDayCellClassNames}
      dayCellContent={onDayCellContent}
      dayCellDidMount={onDayCellDidMount}
      showNonCurrentDates={false}
      fixedWeekCount={false}
    />
  );
};

export default Calendar;
