'use client';

import { useState } from 'react';
import Calendar from '@/features/retrospect/components/Calendar';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import RetrospectContent from '@/features/retrospect/components/RetrospectContent';

export default function RetrospectPage() {
  const [date, setDate] = useState(new Date());
  const [emoji, setEmoji] = useState('');
  const [memo, setMemo] = useState('');

  const onDateSelect = (date: Date, emoji: string = '', memo: string = '') => {
    setDate(date);
    setEmoji(emoji);
    setMemo(memo);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="오늘 회고" />

      <main className="flex-1 px-4 py-6">
        <Calendar onDateSelect={onDateSelect} />
        <RetrospectContent date={date} emoji={emoji} memo={memo} />
      </main>

      <Footer />
    </div>
  );
}
