// ✅ src/lib/styles/inputVariants.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'w-full border outline-none transition bg-white rounded-md px-3 text-base placeholder-transparent',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
      state: {
        default:
          'border-border-input focus:border-brand-primary focus:ring-1 focus:ring-brand-primary',
        error: 'border-priority-must focus:ring-1 focus:ring-priority-must',
        success:
          'border-status-success focus:ring-1 focus:ring-status-success',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
export type InputSize = InputVariantProps['size'];
