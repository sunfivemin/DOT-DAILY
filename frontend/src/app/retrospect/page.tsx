'use client';

import { useState } from 'react';
import Calendar from '@/features/retrospect/components/Calendar';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';

export default function RetrospectPage() {
  const [date, setDate] = useState(new Date());

  const onDateSelect = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="오늘 회고" />

      <main className="flex-1 px-4 py-6">
        <section>
          <Calendar onDateSelect={onDateSelect} />
        </section>

        <section>
          <header
            className="
            bg-zinc-100
            text-zinc-700
            rounded-t-[10px]
            font-kkonghae
            p-2
          ">
            {date instanceof Date ?
              `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 회고` :
              '날짜를 선택해주세요'
            }
          </header>
          <article className="
            flex justify-center items-center
            rounded-b-[10px] 
            min-h-[140px]
            bg-zinc-100
            p-2
            ">
            <figure className="flex flex-col items-center">
              <img src="/good-off.svg" alt="흑백의 좋음 이모지" />
              <figcaption className='
              font-kkonghae
              text-sm
              text-zinc-400
              '>작성된 회고가 없어요</figcaption>
            </figure>
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
      </main>

      <Footer />
    </div>
  );
}
