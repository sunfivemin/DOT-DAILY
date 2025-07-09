'use client';

import MobileLayout from '@/components/layout/MobileLayout';
import { StatCard } from '@/components/ui/StatCard';
import { EmotionStatList, EmotionStat } from '@/components/ui/EmotionStatList';
import { Button } from '@/components/ui/Button/Button';
import { Settings, LogOut, User, Mail } from 'lucide-react';
import { logout } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  
  // mock 데이터 예시
  const stats = [
    { value: 75, label: '전체' },
    { value: 55, label: '성공', color: 'text-green-600' },
    { value: 11, label: '다시', color: 'text-orange-500' },
    { value: 40, label: '보류', color: 'text-blue-500' },
  ];
  
  const emotionStats: EmotionStat[] = [
    { icon: '/good-on.svg', label: '좋음', count: 5, color: 'text-green-500' },
    { icon: '/bad-on.svg', label: '나쁨', count: 2, color: 'text-red-500' },
    { icon: '/soso-on.svg', label: '그냥그럼', count: 5, color: 'text-yellow-500' },
    { icon: '/great-on.svg', label: '뿌듯함', count: 10, color: 'text-purple-500' },
    { icon: '/appreciate-on.svg', label: '감사함', count: 2, color: 'text-pink-500' },
  ];

  const handleLogout = async () => {
    if (confirm('정말 로그아웃하시겠습니까?')) {
      try {
        await logout();
        router.push('/login');
      } catch (error) {
        console.error('로그아웃 실패:', error);
        alert('로그아웃 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <MobileLayout headerTitle="나의 정보">
      <div className="px-4 py-6 space-y-6">
        {/* 프로필 섹션 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">홍길동 님</h1>
              <div className="flex items-center text-gray-500">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">test@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* 할 일 통계 섹션 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">할 일 통계</h2>
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <StatCard value={stat.value} label={stat.label} color={stat.color} />
              </div>
            ))}
          </div>
        </div>

        {/* 감정 기록 통계 섹션 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">감정 기록 통계</h2>
          <EmotionStatList stats={emotionStats} />
        </div>

        {/* 이번 달 요약 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">이번 달 요약</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">총 할 일</span>
              <span className="font-semibold text-gray-900">75개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">완료율</span>
              <span className="font-semibold text-green-600">73%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">연속 기록</span>
              <span className="font-semibold text-purple-600">7일</span>
            </div>
          </div>
        </div>

        {/* 설정 및 로그아웃 섹션 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Button
            variant="ghost"
            fullWidth
            className="flex items-center justify-start px-6 py-4 text-left border-b border-gray-100 last:border-b-0"
          >
            <Settings className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-gray-700">비밀번호 변경</span>
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={handleLogout}
            className="flex items-center justify-start px-6 py-4 text-left text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3 text-red-500" />
            <span>로그아웃</span>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
