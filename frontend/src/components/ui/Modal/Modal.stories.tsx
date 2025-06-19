'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from './ModalProvider';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Modal',
  decorators: [
    Story => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

const Example = () => {
  const { showModal } = useModal();

  return (
    <div className="p-4">
      <Button onClick={() => showModal(<div>안녕하세요, 모달입니다!</div>)}>
        모달 열기
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <Example />,
};
