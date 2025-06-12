// src/app/retrospect/page.tsx
'use client';

import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function RetrospectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="오늘 회고" />
      <main className="flex-1 px-4 py-6">
        <div className="text-center text-text-light">작성한 회고가 없어요</div>

        <div className="flex justify-center gap-2 mt-6 px-4">
          <Button
            label="선택한 날짜로 이동"
            variant="outline"
            className="flex-1 max-w-[160px]"
          />
          <Button
            label="오늘 회고 작성하기"
            variant="solid"
            className="flex-[1.5] max-w-[280px]"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
