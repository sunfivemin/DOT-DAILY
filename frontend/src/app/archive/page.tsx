'use client';

import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ArchivePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="보류함" />
      <main className="flex-1 px-4 py-6 space-y-2">
        <div className="bg-white p-4 rounded-xl shadow-sm text-sm">
          5.30일 강의 완강
          <span className="text-xs ml-2 text-indigo-500">RETRY 3</span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
