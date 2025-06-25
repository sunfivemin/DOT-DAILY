import { DailyEmotionMemo } from './types/retrospect';

// 임시 Mock 데이터 (추후 실제 API로 교체)
const MOCK_DATA: DailyEmotionMemo[] = [
  { date: new Date('2025-06-23'), emotion: 'great', memo: '오늘은 정말 좋은 하루였다!' },
  { date: new Date('2025-06-24'), emotion: 'bad', memo: '새로운 프로젝트를 시작했다.' },
  { date: new Date('2025-06-25'), emotion: 'appreciate', memo: '친구와 맛있는 저녁을 먹었다.' },
  { date: new Date('2025-06-12'), emotion: 'good', memo: '운동을 열심히 했다.' },
  { date: new Date('2025-06-13'), emotion: 'bad', memo: '책을 한 권 다 읽었다.' },
  { date: new Date('2025-06-17'), emotion: 'great', memo: '업무를 모두 마무리했다.' },
  { date: new Date('2025-06-19'), emotion: 'soso', memo: '산책하며 힐링했다.' },
  { date: new Date('2025-06-30'), emotion: 'soso', memo: '한 달을 잘 마무리했다.' },
  { date: new Date('2025-06-26'), emotion: 'bad', memo: '' },
  { date: new Date('2025-06-27'), emotion: 'appreciate', memo: '' },
  { date: new Date('2025-06-28'), emotion: 'great', memo: '' },
  { date: new Date('2025-06-29'), emotion: 'good', memo: '' }
];

export const getDailyEmotionMemos = async (): Promise<DailyEmotionMemo[]> => {
  // const response = await axios.get('/api/retrospect/entries');
  // return response.data;

  return MOCK_DATA;
};