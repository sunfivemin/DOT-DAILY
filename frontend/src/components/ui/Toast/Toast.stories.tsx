'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj;

const Example = () => {
  const { showToast } = useToast();
  return (
    <Button
      label="토스트 보기"
      onClick={() => showToast('✅ 할 일이 등록되었습니다!')}
    />
  );
};

export const Default: Story = {
  render: () => <Example />,
};
