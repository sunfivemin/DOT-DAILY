'use client';

import type { Meta, StoryObj } from '@storybook/react';
import {
  FullScreenModalProvider,
  useFullScreenModal,
} from './FullScreenModalProvider';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/FullScreenModal',
  component: () => null,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <FullScreenModalProvider>
        <Story />
      </FullScreenModalProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj;

const ExampleContent = () => {
  const { openModal } = useFullScreenModal();

  return (
    <div className="p-4">
      <Button
        label="할 일 추가 모달 열기"
        onClick={() =>
          openModal('taskForm', {
            defaultDate: '2025-06-20',
          })
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ExampleContent />,
};
