import { TitleFormatDate } from './types/retrospect';

export const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const titleFormat = (titleDate: TitleFormatDate) => {
  const month = titleDate.date.month + 1;
  const paddedMonth = month < 10 ? `0${month}` : month;
  return `${titleDate.date.year}. ${paddedMonth}`;
};

export const formatDisplayDate = (date: Date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
};