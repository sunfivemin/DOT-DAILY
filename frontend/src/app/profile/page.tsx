"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { StatCard } from "@/components/ui/StatCard";
import { EmotionStatList, EmotionStat } from "@/components/ui/EmotionStatList";
import { Button } from "@/components/ui/Button/Button";
import { LogOut, User, Mail } from "lucide-react";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getUserProfileStats } from "@/lib/api/profile";

interface UserProfile {
  email: string;
  username: string;
}

interface StickerData {
  stickerId: number;
  label: string;
  emoji: string;
  count: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(0);
  const [pending, setPending] = useState(0);
  const [archive, setArchive] = useState(0);
  const [userStats, setUserStats] = useState<StickerData[]>([]);
  const router = useRouter();

  const stats = [
    { value: total, label: "전체" },
    { value: success, label: "성공", color: "text-green-600" },
    { value: pending, label: "다시", color: "text-orange-500" },
    { value: archive, label: "보류", color: "text-blue-500" },
  ];

  const emotionStats: EmotionStat[] = useMemo(() => {
    const baseEmotions = [
      { icon: "/good-on.svg", label: "좋음", color: "text-green-500" },
      { icon: "/bad-on.svg", label: "나쁨", color: "text-red-500" },
      { icon: "/meh-on.svg", label: "그냥그럼", color: "text-yellow-500" },
      { icon: "/proud-on.svg", label: "뿌듯함", color: "text-purple-500" },
      { icon: "/grateful-on.svg", label: "감사함", color: "text-pink-500" },
    ];

    return baseEmotions.map((emotion) => {
      const userStat = userStats.find((stat) => stat.label === emotion.label);
      return {
        ...emotion,
        count: userStat?.count || 0,
      };
    });
  }, [userStats]);

  const onLogout = async () => {
    if (confirm("정말 로그아웃하시겠습니까?")) {
      try {
        await logout();
        router.push("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    const userProfile = async () => {
      const response = await getUserProfileStats();
      setUser(response.user);
      setUserStats(response.stickers);

      const total =
        response.todos.pending +
        response.todos.success +
        response.todos.archive;
      setTotal(total);
      setPending(response.todos.pending);
      setSuccess(response.todos.success);
      setArchive(response.todos.archive);
    };
    userProfile();
  }, []);

  return (
    <MobileLayout headerTitle="나의 정보">
      <div className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {user?.username} 님
              </h1>
              <div className="flex items-center text-gray-500">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            할 일 통계
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            감정 기록 통계
          </h2>
          <EmotionStatList stats={emotionStats} />
        </div>

        {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
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
        </div> */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* <Button
            variant="ghost"
            fullWidth
            className="flex items-center justify-start px-6 py-4 text-left border-b border-gray-100 last:border-b-0"
          >
            <Settings className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-gray-700">비밀번호 변경</span>
          </Button> */}
          <Button
            variant="ghost"
            fullWidth
            onClick={onLogout}
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
