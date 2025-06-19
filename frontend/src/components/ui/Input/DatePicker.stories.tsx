// src/components/ui/Input/DatePicker/DatePicker.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ✅ 공통 Wrapper 컴포넌트
const DatePickerWrapper = ({
  label = '날짜 선택',
  state = 'default',
  disabled = false,
  loading = false,
  size = 'md',
}: {
  label?: string;
  state?: 'default' | 'error' | 'success';
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={setValue}
      state={state}
      disabled={disabled}
      loading={loading}
      size={size}
    />
  );
};

// ✅ 스토리 정의
export const BasicDatePicker: Story = {
  render: () => <DatePickerWrapper />,
};

export const DatePickerWithError: Story = {
  render: () => <DatePickerWrapper state="error" />,
};

export const DisabledDatePicker: Story = {
  render: () => <DatePickerWrapper disabled />,
};

export const LoadingDatePicker: Story = {
  render: () => <DatePickerWrapper loading />,
};

export const DatePickerSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePickerWrapper label="Small" size="sm" />
      <DatePickerWrapper label="Medium" size="md" />
      <DatePickerWrapper label="Large" size="lg" />
    </div>
  ),
};
