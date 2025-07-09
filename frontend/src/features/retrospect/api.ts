import { DailyEmotionMemo } from './types/retrospect';

// 임시 Mock 데이터 (추후 실제 API로 교체)
let MOCK_DATA: DailyEmotionMemo[] = [
  { date: new Date('2025-07-23'), emotion: 'great', memo: '오늘은 정말 좋은 하루였다!' },
  { date: new Date('2025-07-24'), emotion: 'bad', memo: '새로운 프로젝트를 시작했다.' },
  { date: new Date('2025-06-25'), emotion: 'appreciate', memo: '친구와 맛있는 저녁을 먹었다.' },
  { date: new Date('2025-07-12'), emotion: 'good', memo: '운동을 열심히 했다.' },
  { date: new Date('2025-06-13'), emotion: 'bad', memo: '책을 한 권 다 읽었다.' },
  { date: new Date('2025-07-17'), emotion: 'great', memo: '업무를 모두 마무리했다.' },
  { date: new Date('2025-06-19'), emotion: 'soso', memo: '산책하며 힐링했다.' },
  { date: new Date('2025-07-30'), emotion: 'soso', memo: '한 달을 잘 마무리했다.' },
  { date: new Date('2025-06-26'), emotion: 'bad', memo: '' },
  { date: new Date('2025-07-27'), emotion: 'appreciate', memo: '' },
  { date: new Date('2025-07-28'), emotion: 'great', memo: '' },
  { date: new Date('2025-06-29'), emotion: 'good', memo: '' }
];

export const getDailyEmotionMemos = async (): Promise<DailyEmotionMemo[]> => {
  // const response = await axios.get('/api/retrospect/entries');
  // return response.data;

  return MOCK_DATA;
};

export const addDailyEmotionMemo = async (memo: DailyEmotionMemo): Promise<void> => {
  // 기존 데이터에서 같은 날짜의 회고가 있으면 교체, 없으면 추가
  const existingIndex = MOCK_DATA.findIndex(item => 
    item.date.toDateString() === memo.date.toDateString()
  );
  
  if (existingIndex !== -1) {
    MOCK_DATA[existingIndex] = memo;
  } else {
    MOCK_DATA.push(memo);
  }
};

export const updateDailyEmotionMemo = async (memo: DailyEmotionMemo): Promise<void> => {
  // const response = await axios.put(`/api/retrospect/entries/${dateString}`, memo);
  
  const existingIndex = MOCK_DATA.findIndex(item => 
    item.date.toDateString() === memo.date.toDateString()
  );
  
  if (existingIndex !== -1) {
    MOCK_DATA[existingIndex] = memo;
  }
};

export const deleteDailyEmotionMemo = async (date: Date): Promise<void> => {
  // const response = await axios.delete(`/api/retrospect/entries/${dateString}`);
  
  MOCK_DATA = MOCK_DATA.filter(item => 
    item.date.toDateString() !== date.toDateString()
  );
};