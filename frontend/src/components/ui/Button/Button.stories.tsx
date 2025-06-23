import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import { Plus } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트. `children`이 있으면 무시됩니다.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline', 'ghost'],
      description: '버튼의 시각적 스타일을 선택합니다.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기를 선택합니다.',
    },
    rounded: {
      control: 'select',
      options: ['none', 'md', 'full'],
      description: '버튼의 둥글기 정도를 선택합니다.',
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼이 부모 요소의 전체 너비를 차지할지 여부입니다.',
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화할지 여부입니다.',
    },
    children: {
      table: {
        disable: true,
      },
      description: '버튼 내부에 표시될 React 노드 (아이콘 등).',
    },
  },
  args: {
    label: '버튼 텍스트',
    variant: 'primary',
    size: 'md',
    rounded: 'full',
    fullWidth: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  name: '기본 (Controls로 제어)',
  args: {
    label: '컨트롤 패널에서 수정',
  },
};

export const Variants: Story = {
  name: '스타일 종류 (Variants)',
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  name: '크기 종류 (Sizes)',
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  name: '아이콘 버튼',
  render: () => (
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      <span>아이콘 버튼</span>
    </Button>
  ),
};

export const Disabled: Story = {
  name: '비활성화 상태',
  render: () => <Button disabled>Disabled</Button>,
}; 