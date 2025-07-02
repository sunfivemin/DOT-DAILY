'use client';

import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/ui/StatCard';
import { EmotionStatList, EmotionStat } from '@/components/ui/EmotionStatList';

export default function ProfilePage() {
  // mock 데이터 예시
  const stats = [
    { value: 75, label: '전체' },
    { value: 55, label: '성공', color: 'text-red-400' },
    { value: 11, label: '다시', color: 'text-green-500' },
    { value: 40, label: '보류', color: 'text-blue-400' },
  ];
  const emotionStats: EmotionStat[] = [
    { icon: '/good-on.svg', label: '좋음', count: 5, color: 'text-mint-500' },
    { icon: '/bad-on.svg', label: '나쁨', count: 2, color: 'text-blue-500' },
    { icon: '/soso-on.svg', label: '그냥그럼', count: 5, color: 'text-orange-400' },
    { icon: '/great-on.svg', label: '뿌듯함', count: 10, color: 'text-purple-400' },
    { icon: '/appreciate-on.svg', label: '감사함', count: 2, color: 'text-pink-400' },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <Header title="나의 정보" />
      <main className="flex-1 px-4 py-8 max-w-md mx-auto w-full">
        {/* 프로필 */}
        <div className="mb-8">
          <div className="font-bold text-2xl mb-1">홍길동 님</div>
          <div className="text-gray-500 text-base">test@gmail.com</div>
        </div>
        {/* 통계 카드 */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm py-4 flex flex-col items-center">
              <StatCard value={s.value} label={s.label} color={s.color} />
            </div>
          ))}
        </div>
        {/* 감정 통계 */}
        <div className="mb-8">
          <EmotionStatList stats={emotionStats} />
        </div>
        {/* 설정/로그아웃 */}
        <div className="divide-y rounded-xl bg-white shadow-sm overflow-hidden">
          <button className="w-full py-4 text-left px-4 hover:bg-gray-50 transition">비밀번호 변경</button>
          <button className="w-full py-4 text-left px-4 hover:bg-gray-50 transition">로그아웃</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
