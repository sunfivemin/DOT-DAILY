'use client';

import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  'w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all',
  {
    variants: {
      variant: {
        default: '',
        must: '',
        should: '',
        remind: '',
      },
      checked: {
        true: '',
        false: 'bg-transparent border-border-default',
      },
    },
    compoundVariants: [
      {
        checked: true,
        variant: 'default',
        className: 'bg-brand-primary border-brand-primary',
      },
      {
        checked: true,
        variant: 'must',
        className: 'bg-priority-must border-priority-must',
      },
      {
        checked: true,
        variant: 'should',
        className: 'bg-priority-should border-priority-should',
      },
      {
        checked: true,
        variant: 'remind',
        className: 'bg-priority-remind border-priority-remind',
      },
    ],
    defaultVariants: {
      variant: 'default',
      checked: false,
    },
  }
);

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