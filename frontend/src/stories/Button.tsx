// src/stories/Button.tsx
import { cva, VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import React from 'react';

const button = cva(
  'inline-flex items-center justify-center w-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full',
  {
    variants: {
      variant: {
        primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
        secondary:
          'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-100',
        ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100',
      },
      size: {
        sm: 'h-10 text-sm px-4',
        md: 'h-12 text-base px-5',
        lg: 'h-14 text-lg px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonVariant = VariantProps<typeof button>['variant'];
type ButtonSize = VariantProps<typeof button>['size'];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    <button className={clsx(button({ variant, size }), className)} {...props}>
      {label}
    </button>
  );
};
