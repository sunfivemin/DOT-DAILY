import { create } from 'zustand';
import { DailyEmotionMemo, YearMonth } from '@/features/retrospect/types/retrospect';

interface RetrospectState {
  selectedYearMonth: YearMonth;
  setSelectedYearMonth: (yearMonth: YearMonth) => void;
  emotionMemoList: DailyEmotionMemo[];
  setEmotionMemoList: (list: DailyEmotionMemo[]) => void;
  addEmotionMemo: (item: DailyEmotionMemo) => void;
}

export const useRetrospectStore = create<RetrospectState>((set) => ({
  selectedYearMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
  setSelectedYearMonth: (yearMonth) =>
    set({ selectedYearMonth: yearMonth }),

  emotionMemoList: [],
  setEmotionMemoList: (list) => set({ emotionMemoList: list }),
  addEmotionMemo: (item) =>
    set((state) => ({
      emotionMemoList: [...state.emotionMemoList, item]
    })),
}));
