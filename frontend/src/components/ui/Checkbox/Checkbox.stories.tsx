import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Checkbox from './Checkbox';
import type { CheckboxProps } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크박스의 체크 여부',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: '체크 상태 변경 시 호출되는 콜백 함수',
    },
  },
  args: {
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  name: '기본 상태 (Unchecked)',
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  name: '체크된 상태 (Checked)',
  args: {
    checked: true,
  },
};

const InteractiveComponent = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <div className="flex flex-col items-start gap-4">
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
      />
      <p className="text-sm">현재 상태: {checked ? 'Checked' : 'Unchecked'}</p>
    </div>
  );
};

export const Interactive: Story = {
  name: '인터랙티브 예제',
  render: (args: CheckboxProps) => <InteractiveComponent {...args} />,
};