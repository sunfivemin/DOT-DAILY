// src/components/ui/Input/SelectInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SelectInput } from './SelectInput';

const meta: Meta<typeof SelectInput> = {
  title: 'UI/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    state: {
      control: 'radio',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof SelectInput>;

const sampleOptions = [
  { label: '선택 1', value: '1' },
  { label: '선택 2', value: '2' },
  { label: '선택 3', value: '3' },
];

// ✅ 렌더링용 Wrapper 컴포넌트 정의
const SelectInputWrapper = (
  args: Partial<React.ComponentProps<typeof SelectInput>>
) => {
  const [value, setValue] = useState<string>(args.value || '1');
  return (
    <SelectInput
      {...args}
      value={value}
      onChange={setValue}
      options={sampleOptions}
    />
  );
};

export const Default: Story = {
  name: '기본',
  render: () => <SelectInputWrapper label="옵션 선택" />,
};

export const Error: Story = {
  name: '에러 상태',
  render: () => <SelectInputWrapper label="에러" state="error" />,
};

export const Disabled: Story = {
  name: '비활성화 상태',
  render: () => <SelectInputWrapper label="비활성" disabled />,
};

export const Loading: Story = {
  name: '로딩 상태',
  render: () => <SelectInputWrapper label="로딩 중" loading />,
};

export const Sizes: Story = {
  name: '사이즈별 예시',
  render: () => (
    <div className="space-y-4">
      <SelectInputWrapper label="Small" size="sm" />
      <SelectInputWrapper label="Medium" size="md" />
      <SelectInputWrapper label="Large" size="lg" />
    </div>
  ),
};
