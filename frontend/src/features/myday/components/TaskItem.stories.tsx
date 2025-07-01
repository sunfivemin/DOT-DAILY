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
    task: {
      id: 1,
      title: '1순위 작업 항목입니다.',
      priority: 'must',
      date: '2024-06-03',
      done: false,
      retryCount: 0,
    },
  },
};

export const Should: Story = {
  args: {
    task: {
      id: 2,
      title: '2순위 항목 - 선택적입니다.',
      priority: 'should',
      date: '2024-06-03',
      done: false,
      retryCount: 0,
    },
  },
};

export const Remind: Story = {
  args: {
    task: {
      id: 3,
      title: '3순위 - 리마인드용입니다.',
      priority: 'remind',
      date: '2024-06-03',
      done: false,
      retryCount: 0,
    },
  },
};

export const DoneTask: Story = {
  args: {
    task: {
      id: 4,
      title: '완료된 작업 항목입니다.',
      priority: 'must',
      date: '2024-06-03',
      done: true,
      retryCount: 0,
    },
  },
};

export const RetryTask: Story = {
  args: {
    task: {
      id: 5,
      title: '재시도된 작업 항목입니다.',
      priority: 'should',
      date: '2024-06-03',
      done: false,
      retryCount: 3,
    },
  },
}; 