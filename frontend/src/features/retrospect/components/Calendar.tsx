"use client";

import { useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { DayCellContentArg } from "@fullcalendar/core";
import "./Calendar.css";
import { getDailyEmotionMemos } from "../../../lib/api/retrospect";
import { formatDateToString } from "../../../utils/retrospectUtils";
import { useDateStore } from "@/store/useDateStore";
import { useRetrospectStore } from "@/store/useRestrospectStore";

interface CalendarProps {
  onDateModalOpen: () => void;
}

const Calendar = ({ onDateModalOpen }: CalendarProps) => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const { emotionMemoList, setEmotionMemoList, selectedYearMonth } =
    useRetrospectStore();
  const calendarRef = useRef<FullCalendar>(null);

  const onDateClick = useCallback(
    (dateInfo: DateClickArg) => {
      setSelectedDate(dateInfo.date);
    },
    [setSelectedDate]
  );

  const onDateNavigation = useCallback(() => {
    onDateModalOpen();
  }, [onDateModalOpen]);

  const emotionByDateMap = useMemo(() => {
    return emotionMemoList.reduce(
      (acc: Record<string, string>, item: { date: Date; emotion: string }) => {
        acc[formatDateToString(item.date)] = item.emotion;
        return acc;
      },
      {} as Record<string, string>
    );
  }, [emotionMemoList]);

  const onDayCellClassNames = useCallback(
    (dayCell: DayCellContentArg) => {
      const classes = [];
      const dateString = formatDateToString(dayCell.date);
      const emotion = emotionByDateMap[dateString];

      if (emotion) {
        classes.push(`emotion-${emotion}`);
      }

      if (
        formatDateToString(dayCell.date) === formatDateToString(selectedDate)
      ) {
        classes.push("selected-date");
      }

      return classes;
    },
    [emotionByDateMap, selectedDate]
  );

  const onDayCellContent = useCallback((dayCell: DayCellContentArg) => {
    return dayCell.dayNumberText.replace("일", "");
  }, []);

  const onDayCellDidMount = useCallback(
    (dayCell: DayCellContentArg) => {
      const dateString = formatDateToString(dayCell.date);
      const emotion = emotionByDateMap[dateString];
      const isSelected =
        formatDateToString(dayCell.date) === formatDateToString(selectedDate);
      const isToday =
        formatDateToString(dayCell.date) === formatDateToString(new Date());

      if (emotion) {
        dayCell.el.classList.add(`emotion-${emotion}`);
      }

      // 기존 라벨들 제거
      const existingLabel = dayCell.el.querySelector(".selected-label");
      if (existingLabel) {
        existingLabel.remove();
      }

      if (isSelected && !isToday) {
        // 선택된 날짜이지만 오늘이 아닌 경우 "선택" 라벨 표시
        dayCell.el.classList.add("selected-date");

        const label = document.createElement("div");
        label.className = "selected-label";
        label.textContent = "선택";
        label.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: #262c33;
          color: #fff;
          padding: 1px 0;
          font-size: 10px;
          text-align: center;
          border-radius: 4px;
          width: 32px;
          z-index: 10;
          pointer-events: none;
        `;

        dayCell.el.appendChild(label);
      } else if (isToday) {
        // 오늘 날짜인 경우 항상 "오늘" 라벨 표시
        const label = document.createElement("div");
        label.className = "today-label";
        label.textContent = "오늘";
        label.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: #d1fae5;
          color: #000;
          padding: 1px 0;
          font-size: 10px;
          text-align: center;
          border-radius: 4px;
          width: 32px;
          z-index: 10;
          pointer-events: none;
        `;

        dayCell.el.appendChild(label);
      } else if (isSelected && isToday) {
        // 오늘이면서 선택된 경우에도 "오늘" 라벨 표시
        dayCell.el.classList.add("selected-date");

        const label = document.createElement("div");
        label.className = "today-label";
        label.textContent = "오늘";
        label.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: #d1fae5;
          color: #000;
          padding: 1px 0;
          font-size: 10px;
          text-align: center;
          border-radius: 4px;
          width: 32px;
          z-index: 10;
          pointer-events: none;
        `;

        dayCell.el.appendChild(label);
      }
    },
    [emotionByDateMap, selectedDate]
  );

  useEffect(() => {
    const fetchEmotionMemos = async () => {
      try {
        const memos = await getDailyEmotionMemos(
          selectedYearMonth.year,
          selectedYearMonth.month
        );
        setEmotionMemoList(memos);
      } catch {
        // 감정 메모 조회 실패
      }
    };

    fetchEmotionMemos();

    if (calendarRef.current) {
      const targetDate = new Date(
        selectedYearMonth.year,
        selectedYearMonth.month - 1,
        1
      );
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(targetDate);
    }
  }, [selectedYearMonth, setEmotionMemoList]);

  return (
    <section aria-label="회고 캘린더">
      <button
        onClick={onDateNavigation}
        className="flex gap-2 items-center text-xl font-bold mb-8"
      >
        {selectedYearMonth.year}. {selectedYearMonth.month}
        <Image
          src="/dropdown.svg"
          alt="달력 선택"
          width={20}
          height={20}
          style={{ width: "20px", height: "20px" }}
        />
      </button>
      <div className="calendar-container">
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
          dayCellDidMount={onDayCellDidMount}
          showNonCurrentDates={false}
          fixedWeekCount={false}
          // 성능 최적화 옵션들
          eventDisplay="block"
          dayMaxEvents={false}
          navLinks={false}
          selectable={false}
          selectMirror={false}
          unselectAuto={true}
          eventStartEditable={false}
          eventDurationEditable={false}
          eventResizableFromStart={false}
          droppable={false}
          // 렌더링 최적화
          progressiveEventRendering={true}
          lazyFetching={true}
          // 메모리 최적화
          eventOrder="start,-duration,allDay,title"
          rerenderDelay={10}
        />
      </div>
    </section>
  );
};

export default Calendar;
