import React from 'react';
import Image from 'next/image';

export interface EmotionStat {
  icon: string; // 이미지 경로
  label: string;
  count: number;
  color?: string; // tailwind text-mint-500 등 (아이콘에만 적용)
}

interface EmotionStatListProps {
  stats: EmotionStat[];
}

export const EmotionStatList: React.FC<EmotionStatListProps> = ({ stats }) => (
  <div className="bg-gray-50 rounded-xl px-4 py-3 grid grid-cols-3 gap-x-6 gap-y-3">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="flex items-center"
      >
        <Image src={stat.icon} alt={stat.label} width={28} height={28} className={`mr-2 ${stat.color ?? ''}`} />
        <div>
          <span className="text-gray-700 whitespace-nowrap">{stat.label}</span>
          <span className="ml-1 font-bold text-gray-900 whitespace-nowrap">{stat.count}번</span>
        </div>
      </div>
    ))}
  </div>
); 