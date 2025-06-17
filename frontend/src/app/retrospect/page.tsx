'use client';

import { useState } from 'react';
import Calendar from '@/features/retrospect/components/Calendar';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import RetrospectContent from '@/features/retrospect/components/RetrospectContent';
import { Button } from '@/components/ui/Button';
import { useRetrospectModal } from '@/features/retrospect/hooks/useRestrospectModal';
import RetrospectModal from '@/features/retrospect/components/RetrospectModal';
import { Emotion } from '@/constants/emotion';

export default function RetrospectPage() {
  const [date, setDate] = useState(new Date());
  const [emotion, setEmotion] = useState<Emotion['id'] | ''>('');
  const [memo, setMemo] = useState('');
  const modal = useRetrospectModal();

  const onDateSelect = (date: Date, emotion: Emotion['id'] | '', memo: string) => {
    setDate(date);
    setEmotion(emotion);
    setMemo(memo);
  };

  const onTodayRetrospect = () => {
    const today = new Date();
    setDate(today);
    modal.openModal();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="오늘 회고" />

      {modal.isOpen ? (
        <RetrospectModal
          isOpen={modal.isOpen}
          selectedEmotion={modal.selectedEmotion}
          retrospectText={modal.retrospectText}
          onEmotionSelect={modal.setSelectedEmotion}
          onTextChange={modal.setRetrospectText}
          onClose={modal.closeModal}
          onSubmit={modal.onSubmit}
        />
      ) : (
        <>
          <main className="flex-1 px-4 py-6">
            <Calendar onDateSelect={onDateSelect} />
            <RetrospectContent date={date} emotion={emotion} memo={memo} />
          </main>
          
          <nav aria-label="날짜 이동 및 회고 작성" className="flex justify-center gap-2 px-4 py-6">
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
        </>
      )}
      <Footer />
    </div>
  );
}
