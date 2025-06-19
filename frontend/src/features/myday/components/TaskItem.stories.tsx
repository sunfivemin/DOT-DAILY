// src/stories/TaskItem.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import TaskItem from './TaskItem';

const meta: Meta<typeof TaskItem> = {
  title: 'UI/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskItem>;

export const Must: Story = {
  args: {
    label: '1순위 작업 항목입니다.',
    priority: 'must',
    done: false,
  },
};

export const Should: Story = {
  args: {
    label: '2순위 항목 - 선택적입니다.',
    priority: 'should',
    done: false,
  },
};

export const Remind: Story = {
  args: {
    label: '3순위 - 리마인드용입니다.',
    priority: 'remind',
    done: false,
  },
};

export const DoneTask: Story = {
  args: {
    label: '완료된 작업 항목입니다.',
    priority: 'must',
    done: true,
  },
};
