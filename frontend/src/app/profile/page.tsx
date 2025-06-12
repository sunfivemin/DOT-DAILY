'use client';

import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="나의 정보" />
      <main className="flex-1 px-4 py-6">
        <h2 className="text-lg font-semibold">홍길동 님</h2>
        <ul className="mt-4 divide-y text-sm">
          <li className="py-3 flex justify-between items-center">
            <span>비밀번호 변경</span>
            <span className="text-gray-400">&gt;</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <span>로그아웃</span>
            <span className="text-gray-400">&gt;</span>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
