import { DailyEmotionMemo } from '../types/retrospect';
import { EMOTIONS } from '@/constants/emotion';

const RetrospectContent = ({ date, emotion, memo }: DailyEmotionMemo) => {
  const emotionLabel = EMOTIONS.find(e => e.id === emotion)?.label;

  return (
    <article
      aria-label="회고 내용"
      className="
        bg-zinc-100
        rounded-lg
        h-[160px]
        p-4
      ">
      <header className='mb-2 text-zinc-700 font-kkonghae'>
        {date instanceof Date ?
          `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` :
          '날짜를 선택해주세요'
        }
      </header>

      {emotion ? (
        <figure className="flex gap-2 items-center">
          <img src={`/${emotion}-on.svg`} alt={`${emotionLabel} 이모션`} />
          <figcaption className='font-kkonghae'>{memo || emotionLabel}</figcaption>
        </figure>
      ) : (
        <figure className="flex flex-col gap-2 items-center">
          <img src="/good-off.svg" alt="회고 이모션" />
          <figcaption className="font-kkonghae text-zinc-400 ">
            작성된 회고가 없어요
          </figcaption>
        </figure>
      )}
    </article>
  );
};

export default RetrospectContent; 