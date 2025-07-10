export const EMOTION_TO_STICKER_ID: Record<string, number> = {
  good: 1,
  bad: 2,
  meh: 3,
  proud: 4,
  grateful: 5,
};

export const EMOTIONS = [
  { id: 'good', label: '좋음' },
  { id: 'bad', label: '나쁨' },
  { id: 'meh', label: '그냥그럼' },
  { id: 'proud', label: '뿌듯함' },
  { id: 'grateful', label: '감사함' }
];

export type Emotion = typeof EMOTIONS[number];