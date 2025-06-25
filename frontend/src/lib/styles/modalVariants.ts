import { cva } from 'class-variance-authority';

export const modalVariants = cva(
  'fixed inset-0 z-50 flex items-end justify-center', // 하단 정렬
  {
    variants: {
      variant: {
        default: 'bg-white rounded-xl shadow-lg p-6',
        bottomSheet: 'bg-white rounded-t-2xl shadow-2xl p-6', // 바텀시트 스타일
      },
      size: {
        sm: 'max-w-xs',
        md: 'max-w-md',
        lg: 'max-w-lg',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
); 