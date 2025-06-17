'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { DayCellContentArg } from '@fullcalendar/core';
import './Calendar.css';
import { getDailyEmotionMemos } from '../api';
import { DailyEmotionMemo } from '../types/retrospect';
import { formatDateToString, titleFormat } from '../utils';
import { Emotion } from '@/constants/emotion';

interface CalendarProps {
  onDateSelect: (date: Date, emotion: Emotion['id'] | '', memo: string) => void;
}

const Calendar = ({ onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [emotionMemoList, setEmotionMemoList] = useState<DailyEmotionMemo[]>([]);

  const headerToolbar = useMemo(() => ({
    start: "title",
    center: "",
    // end: "prev next"
    end: ""
  }), []);

  const onDateClick = (dateInfo: DateClickArg) => {
    const clickedDate = formatDateToString(dateInfo.date);
    setSelectedDate(clickedDate);

    const selectedItem = emotionMemoList.find(item => formatDateToString(item.date) === clickedDate);
    const selectedEmotion = selectedItem?.emotion || '';
    const selectedMemo = selectedItem?.memo || '';

    if (onDateSelect) {
      onDateSelect(dateInfo.date, selectedEmotion, selectedMemo);
    }
  };

  const emotionByDateMap = useMemo(() => {
    return emotionMemoList.reduce((acc, item) => {
      acc[formatDateToString(item.date)] = item.emotion;
      return acc;
    }, {} as Record<string, string>);
  }, [emotionMemoList]);

  const onDayCellClassNames = useCallback((dayCell: DayCellContentArg) => {
    const classes = [];
    const dateStr = formatDateToString(dayCell.date);

    if (dateStr === selectedDate) {
      classes.push('selected');
    }

    const emotionType = emotionByDateMap[dateStr];
    if (emotionType) {
      classes.push(`emotion-${emotionType}`);
    }

    return classes;
  }, [selectedDate, emotionByDateMap]);

  const onDayCellContent = (e: DayCellContentArg) => {
    return e.dayNumberText.replace('일', '');
  };

  useEffect(() => {
    const getEmotionMemos = async () => {
      const data = await getDailyEmotionMemos();
      setEmotionMemoList(data);
    };
    getEmotionMemos();
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
