'use client';

import { useState } from 'react';
import Calendar from '@/features/retrospect/components/Calendar';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Emotion } from '@/constants/emotion';
import RetrospectContent from '@/features/retrospect/components/RetrospectContent';
import { FullScreenModalProvider, useFullScreenModal } from '@/components/ui/FullScreenModal/FullScreenModalProvider';

function RetrospectPageContent() {
  const [date, setDate] = useState(new Date());
  const [emotion, setEmotion] = useState<Emotion['id'] | ''>('');
  const [memo, setMemo] = useState('');
  const { openModal } = useFullScreenModal();

  const onDateSelect = (date: Date, emotion: Emotion['id'] | '', memo: string) => {
    setDate(date);
    setEmotion(emotion);
    setMemo(memo);
  };

  const onTodayRetrospect = () => {
    const today = new Date();
    setDate(today);
    openModal('retrospectForm');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="오늘 회고" />

      <div className="flex-1">
        <main className="px-4 py-6">
          <Calendar onDateSelect={onDateSelect} />
          <RetrospectContent date={date} emotion={emotion} memo={memo} />
        </main>

      </div>

      <nav
        aria-label="날짜 이동 및 회고 작성"
        className="flex justify-center gap-2 px-4 py-6">
        <Button
          label="선택한 날짜로 이동"
          variant="outline"
          className="flex-1 max-w-[160px]"
        />
        <Button
          label="오늘 회고 작성하기"
          variant="solid"
          className="flex-[1.5] max-w-[280px]"
          onClick={onTodayRetrospect}
        />
      </nav>

      <Footer />
    </div>
  );
}

export default function RetrospectPage() {
  return (
    <FullScreenModalProvider>
      <RetrospectPageContent />
    </FullScreenModalProvider>
  );
}