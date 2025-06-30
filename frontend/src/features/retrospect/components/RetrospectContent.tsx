import { EMOTIONS } from '@/constants/emotion';
import { useDateStore } from '@/store/useDateStore';
import { formatDateToString, formatDisplayDate } from '../utils';
import { useMemo } from 'react';
import { useRetrospectStore } from '@/store/useRestrospectStore';
import Image from 'next/image';

const RetrospectContent = () => {
  const { selectedDate } = useDateStore();
  const { emotionMemoList } = useRetrospectStore();
  const selectedEmotionMemo = useMemo(() => {
    return emotionMemoList.find(item => {
      return formatDateToString(item.date) === formatDateToString(selectedDate);
    });
  }, [emotionMemoList, selectedDate]);
  const emotion = selectedEmotionMemo?.emotion || '';
  const memo = selectedEmotionMemo?.memo || '';
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
        {formatDisplayDate(selectedDate)}
      </header>

      {emotion ? (
        <figure className="flex gap-2 items-center">
          <Image src={`/${emotion}-on.svg`} alt={`${emotionLabel} 이모션`} width={28} height={28} />
          <figcaption className='font-kkonghae'>{memo || emotionLabel}</figcaption>
        </figure>
      ) : (
        <figure className="flex flex-col gap-2 items-center">
          <Image src="/good-off.svg" alt="회고 이모션" width={32} height={32} />
          <figcaption className="font-kkonghae text-zinc-400 ">
            작성된 회고가 없어요
          </figcaption>
        </figure>
      )}
    </article>
  );
};

export default RetrospectContent; 