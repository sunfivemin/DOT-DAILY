import { Button } from '@/components/ui/Button';
import { DailyEmojiMemo } from '../types/retrospect';

const RetrospectContent = ({ date, emoji, memo }: DailyEmojiMemo) => {
  return (
    <section aria-label="회고 내용">
      <article className="
        bg-zinc-100
        rounded-[10px]
        font-kkonghae
        h-[140px]
        p-2
      ">
        <header className='mb-2 text-zinc-700'>
          {date instanceof Date ?
            `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` :
            '날짜를 선택해주세요'
          }
        </header>

        {emoji ? (
          <figure className="flex gap-2 items-center">
            <img src={`/${emoji}-on.svg`} alt={`${emoji} 이모지`} />
            <figcaption>{memo || emoji}</figcaption>
          </figure>
        ) : (
          <figure className="flex flex-col gap-2 items-center">
            <img src="/good-off.svg" alt="흑백의 좋음 이모지" />
            <figcaption className="text-zinc-400">
              작성된 회고가 없어요
            </figcaption>
          </figure>
        )}
      </article>

      <div className="flex justify-center gap-2 mt-6 px-4">
        <Button
          label="선택한 날짜로 이동"
          variant="secondary"
          className="flex-1 max-w-[160px]"
        />
        <Button
          label="오늘 회고 작성하기"
          className="flex-[1.5] max-w-[280px]"
        />
      </div>
    </section>
  );
};

export default RetrospectContent; 