'use client';

import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { checkboxVariants } from '@/lib/styles/checkboxVariants';
import type { VariantProps } from 'class-variance-authority';

export interface CheckboxProps
  extends Omit<VariantProps<typeof checkboxVariants>, 'checked'> {
  /**
   * 체크 여부 상태
   */
  checked?: boolean;
  /**
   * 상태 변경 시 호출되는 콜백
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * 사용자 정의 클래스 이름
   */
  className?: string;
}

export default function Checkbox({
  checked = false,
  onCheckedChange,
  variant,
  className,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={clsx(className, checkboxVariants({ variant, checked }))}
    >
      {checked && <Check className="w-4 h-4 text-white" />}
    </button>
  );
}