import { Emotion } from '@/constants/emotion';

export interface DailyEmotionMemo {
  date: Date;
  emotion: Emotion['id'];
  memo: string;
}

export interface TitleFormatDate {
  date: {
    year: number;
    month: number;
    day: number;
  };
}