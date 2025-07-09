import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
  color?: string; // tailwind text-red-400 등
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => (
  <div className="flex flex-col items-center justify-center w-full">
    <div className={`text-2xl font-bold mb-1 ${color ?? 'text-gray-900'}`}>
      {value}
    </div>
    <div className="text-xs text-gray-600 font-medium whitespace-nowrap">
      {label}
    </div>
  </div>
); 