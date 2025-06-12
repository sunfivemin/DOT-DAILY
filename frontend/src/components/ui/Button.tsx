// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { buttonVariants } from '@/lib/styles/buttonVariants';
import type { VariantProps } from 'class-variance-authority';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  label,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {label}
    </button>
  );
};
