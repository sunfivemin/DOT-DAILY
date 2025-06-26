'use client';

import Calendar from '@/features/retrospect/components/Calendar';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import RetrospectContent from '@/features/retrospect/components/RetrospectContent';
import { FullScreenModalProvider, useFullScreenModal } from '@/components/ui/Modal/providers/FullScreenModalProvider';

function RetrospectPageContent() {
  const { openModal } = useFullScreenModal();

  const onTodayRetrospect = () => {
    openModal('retrospectForm');
  };

  const onDateNavigation = () => {
    openModal('dateNavigationForm');
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="오늘 회고" />

      <div className="flex-1">
        <main className="px-4 py-2">
          <Calendar onDateModalOpen={onDateNavigation} />
          <RetrospectContent />
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