// src/components/ui/Input/CustomCaption.tsx
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CustomCaptionProps {
  displayMonth: Date;
  onPreviousClick(): void;
  onNextClick(): void;
}

export function CustomCaption({
  displayMonth,
  onPreviousClick,
  onNextClick,
}: CustomCaptionProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button
        type="button"
        aria-label="Previous month"
        onClick={onPreviousClick}
        className="text-indigo-600 hover:text-indigo-800 p-1"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-gray-800 font-semibold text-base">
        {format(displayMonth, 'LLLL yyyy')}
      </span>

      <button
        type="button"
        aria-label="Next month"
        onClick={onNextClick}
        className="text-indigo-600 hover:text-indigo-800 p-1"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
