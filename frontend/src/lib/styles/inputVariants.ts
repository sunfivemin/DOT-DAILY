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
          'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
        error: 'border-red-500 focus:ring-1 focus:ring-red-500',
        success: 'border-green-500 focus:ring-1 focus:ring-green-500',
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
