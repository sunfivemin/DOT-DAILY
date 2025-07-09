'use client';

import { useCallback, useMemo, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { DayCellContentArg } from '@fullcalendar/core';
import Image from 'next/image';
import './Calendar.css';
import { getDailyEmotionMemos } from '../api';
import { formatDateToString } from '../utils';
import { useDateStore } from '@/store/useDateStore';
import { useRetrospectStore } from '@/store/useRestrospectStore';

interface CalendarProps {
  onDateModalOpen: () => void;
}

const Calendar = ({ onDateModalOpen }: CalendarProps) => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const { emotionMemoList, setEmotionMemoList, selectedYearMonth } = useRetrospectStore();
  const calendarRef = useRef<FullCalendar>(null);

  const onDateNavigation = () => {
    onDateModalOpen();
  }

  const onDateClick = (dateInfo: DateClickArg) => {
    setSelectedDate(dateInfo.date);
  };

  const emotionByDateMap = useMemo(() => {
    return emotionMemoList.reduce((acc, item) => {
      acc[formatDateToString(item.date)] = item.emotion;
      return acc;
    }, {} as Record<string, string>);
  }, [emotionMemoList]);

  const onDayCellClassNames = useCallback((dayCell: DayCellContentArg) => {
    const classes = [];

    if (formatDateToString(dayCell.date) === formatDateToString(selectedDate)) {
      classes.push('selected');
    }

    const emotionType = emotionByDateMap[formatDateToString(dayCell.date)];
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
  }, [setEmotionMemoList]);

  useEffect(() => {
    if (calendarRef.current) {
      const targetDate = new Date(selectedYearMonth.year, selectedYearMonth.month - 1, 1);
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(targetDate);
    }
  }, [selectedYearMonth]);

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        height={320}
        headerToolbar={false}
        dateClick={onDateClick}
        dayCellClassNames={onDayCellClassNames}
        dayCellContent={onDayCellContent}
        showNonCurrentDates={false}
        fixedWeekCount={false}
      />
    </div>
  );
};

export default Calendar;
