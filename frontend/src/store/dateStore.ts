import { create } from 'zustand';
import { DailyEmotionMemo } from '@/features/retrospect/types/retrospect';

interface YearMonth {
  year: number;
  month: number;
}

interface DateState {
  selectedYearMonth: YearMonth;
  setSelectedYearMonth: (yearMonth: YearMonth) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  emotionMemoList: DailyEmotionMemo[];
  setEmotionMemoList: (list: DailyEmotionMemo[]) => void;
  addEmotionMemo: (item: DailyEmotionMemo) => void;
}

export const useDateStore = create<DateState>((set) => ({
  selectedYearMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
  setSelectedYearMonth: (yearMonth) =>
    set((state) => ({ selectedYearMonth: yearMonth })),

  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (date) => set({ selectedDate: date }),

  emotionMemoList: [],
  setEmotionMemoList: (list) => set({ emotionMemoList: list }),
  addEmotionMemo: (item) =>
    set((state) => ({
      emotionMemoList: [...state.emotionMemoList, item]
    })),
}));
// 현재 목업 데이터 타입이 string