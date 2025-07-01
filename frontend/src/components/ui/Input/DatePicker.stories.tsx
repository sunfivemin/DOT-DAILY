// src/components/ui/Input/DatePicker/DatePicker.stories.tsx
import React from 'react';
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

type WrapperProps = React.ComponentProps<typeof DatePicker>;

const DatePickerWrapper = (args: WrapperProps) => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePicker
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const BasicDatePicker: Story = {
  name: '기본 날짜 선택기',
  render: (args) => <DatePickerWrapper {...args} />,
};

export const DatePickerWithError: Story = {
  name: '에러 상태',
  render: (args) => <DatePickerWrapper {...args} state="error" />,
};

export const DisabledDatePicker: Story = {
  name: '비활성화 상태',
  render: (args) => <DatePickerWrapper {...args} disabled />,
};

export const LoadingDatePicker: Story = {
  name: '로딩 상태',
  render: (args) => <DatePickerWrapper {...args} loading />,
};

export const DatePickerSizes: Story = {
  name: '사이즈별',
  render: (args) => (
    <div className="space-y-4">
      <DatePickerWrapper {...args} label="Small" size="sm" />
      <DatePickerWrapper {...args} label="Medium" size="md" />
      <DatePickerWrapper {...args} label="Large" size="lg" />
    </div>
  ),
};