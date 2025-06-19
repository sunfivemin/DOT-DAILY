// src/components/ui/Input/DatePicker.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import clsx from 'clsx';
import { inputVariants } from '@/lib/styles/inputVariants';
import type { Size } from './Input'; // ✅ 여기 import

interface DatePickerProps {
  id?: string;
  label?: string;
  state?: 'default' | 'error' | 'success';
  size?: Size; // ✅ string 아님
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  className?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function DatePicker({
  id,
  label,
  state = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  loading = false,
  className,
  value,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(value ?? null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date: Date | undefined) => {
    const next = date ?? null;
    setSelected(next);
    setOpen(false);
    onChange?.(next);
  };

  const baseClass = clsx(
    inputVariants({ size, state }),
    'relative w-full cursor-pointer',
    {
      'opacity-50 cursor-not-allowed bg-gray-100': disabled || loading,
    },
    className
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          id={id ? `${id}-label` : undefined}
          className="block mb-1 text-sm text-gray-500"
        >
          {label}
        </label>
      )}
      <div
        id={id}
        role="button"
        aria-disabled={disabled || loading}
        aria-labelledby={id && label ? `${id}-label` : undefined}
        className={baseClass}
        onClick={() => !disabled && !readOnly && setOpen(!open)}
      >
        <span className="w-full h-full flex items-center text-gray-800 px-4 text-sm">
          {selected ? format(selected, 'yyyy-MM-dd') : '날짜를 선택해주세요'}
        </span>
        <CalendarIcon className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          <DayPicker
            mode="single"
            selected={selected ?? undefined}
            onSelect={handleSelect}
            className="text-sm text-gray-800"
            classNames={{
              caption:
                'flex justify-center items-center px-4 pt-6 pb-2 font-semibold text-gray-800 relative',
              nav: 'absolute left-4 top-1 flex items-center gap-20',
              nav_button:
                'text-indigo-600 hover:text-indigo-400 transition-colors',
              table: 'w-full border-collapse mt-2',
              head_row: 'text-gray-500 text-xs left-10',
              row: 'text-center',
              day: 'w-8 h-8 rounded hover:bg-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400',
              day_selected: 'bg-indigo-600 text-white',
            }}
            modifiersClassNames={{
              selected: 'bg-indigo-600 text-white',
              today: 'text-indigo-600 font-semibold',
            }}
          />
        </div>
      )}
    </div>
  );
}
