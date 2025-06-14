export interface DailyEmojiMemo {
  date: Date;
  emoji: string;
  memo: string;
} 

export interface TitleFormatDate {
  date: {
    year: number;
    month: number;
    day: number;
  };
}