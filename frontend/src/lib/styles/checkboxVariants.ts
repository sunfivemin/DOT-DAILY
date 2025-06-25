import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
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
      { checked: true, variant: 'default', className: 'bg-brand-primary border-brand-primary' },
      { checked: true, variant: 'must', className: 'bg-priority-must border-priority-must' },
      { checked: true, variant: 'should', className: 'bg-priority-should border-priority-should' },
      { checked: true, variant: 'remind', className: 'bg-priority-remind border-priority-remind' },
    ],
    defaultVariants: {
      variant: 'default',
      checked: false,
    },
  }
); 