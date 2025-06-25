import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import BottomSheetModal from './BottomSheetModal';

const meta: Meta = {
  title: 'Components/Modal',
};

export default meta;
type Story = StoryObj;

const BottomSheetExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4 min-h-[400px] flex items-end justify-center">
      <Button onClick={() => setOpen(true)}>바텀시트 열기</Button>
      <BottomSheetModal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-stretch w-full">
          <h2 className="text-lg font-bold mb-2">바텀시트 모달</h2>
          <p>이곳에 원하는 내용을 넣으세요.</p>
          <div className="flex gap-2 mt-6">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              확인
            </Button>
          </div>
        </div>
      </BottomSheetModal>
    </div>
  );
};

export const BottomSheet: Story = {
  render: () => <BottomSheetExample />,
};