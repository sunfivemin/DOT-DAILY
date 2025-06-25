import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Plus, Edit } from 'lucide-react';
import Fab from './Fab';

const meta: Meta<typeof Fab> = {
  title: 'Components/UI/Fab',
  component: Fab,
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: { disable: true },
      description: 'Fab 내부에 표시될 아이콘 컴포넌트입니다.',
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화할지 여부입니다.',
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Default: Story = {
  name: '기본 Fab',
  args: {
    'aria-label': '새로운 항목 추가',
    children: <Plus className="w-6 h-6" />,
  },
};

export const Disabled: Story = {
  name: '비활성화 상태',
  args: {
    'aria-label': '추가 비활성화됨',
    children: <Plus className="w-6 h-6" />,
    disabled: true,
  },
};

export const AnotherIcon: Story = {
  name: '다른 아이콘 예시',
  args: {
    'aria-label': '편집하기',
    children: <Edit className="w-6 h-6" />,
  },
}; 