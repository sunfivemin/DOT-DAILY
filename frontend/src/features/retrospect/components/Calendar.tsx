'use client';

import { useCallback, useMemo, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { DayCellContentArg } from '@fullcalendar/core';
import './Calendar.css';
import { getDailyEmotionMemos } from '../api';
import { formatDateToString } from '../utils';
import { useDateStore } from '@/store/dateStore';

interface CalendarProps {
  onDateModalOpen: () => void;
}

const Calendar = ({ onDateModalOpen }: CalendarProps) => {
  const {
    selectedDate,
    setSelectedDate,
    emotionMemoList,
    setEmotionMemoList,
    selectedYearMonth
  } = useDateStore();
  const calendarRef = useRef<FullCalendar>(null);

  const onDateNavigation = () => {
    onDateModalOpen();
  }

  const onDateClick = (dateInfo: DateClickArg) => {
    const clickedDate = formatDateToString(dateInfo.date);
    setSelectedDate(clickedDate);
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

  useEffect(() => {
    if (calendarRef.current) {
      const targetDate = new Date(selectedYearMonth.year, selectedYearMonth.month - 1, 1);
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(targetDate);
    }
  }, [selectedYearMonth]);

  return (
    <section aria-label="회고 캘린더">
      <button
        onClick={onDateNavigation}
        className='flex gap-2 items-center text-xl font-bold mb-8'
      >
        {selectedYearMonth.year}. {selectedYearMonth.month}
        <img src="/dropdown.svg" alt="달력 선택" />
      </button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        height="auto"
        headerToolbar={false}
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
