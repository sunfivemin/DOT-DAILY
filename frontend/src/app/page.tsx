'use client';

import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TaskItem } from '@/features/myday/components';

export default function MyDayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="나의 하루" />
      <main className="flex-1 px-4 py-6 space-y-4">
        <TaskItem label="6.2일 강의 완강" done={true} priority="must" />
        {/* ...추가 TaskItem */}
      </main>
      <Footer />
    </div>
  );
}
