'use client';

import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { checkboxVariants } from '@/lib/styles/checkboxVariants';
import type { VariantProps } from 'class-variance-authority';

interface CheckboxProps
  extends Omit<VariantProps<typeof checkboxVariants>, 'checked'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
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
      onClick={() => onCheckedChange?.(!checked)}
      role="checkbox"
      aria-checked={checked}
      className={clsx(className, checkboxVariants({ variant, checked }))}
    >
      {checked && <Check className="w-4 h-4 text-white" />}
    </button>
  );
} 