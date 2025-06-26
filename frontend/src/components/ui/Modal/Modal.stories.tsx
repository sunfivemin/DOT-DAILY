import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import BottomSheetModal from './components/BottomSheetModal';
import ModalItem from './components/ModalItem';
import { ModalProvider as ModalProviderComponent, useModal } from './providers/ModalProvider';

const meta: Meta = {
  title: 'Components/Modal',
};

export default meta;
type Story = StoryObj;

// 바텀시트 모달 예시
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

// 일반 팝업 모달 예시
const PopupModalExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>팝업 모달 열기</Button>
      <ModalItem open={open} onClose={() => setOpen(false)}>
        <div className="p-4 min-w-[300px]">
          <h2 className="text-lg font-bold mb-2">팝업 모달</h2>
          <p>중앙에 표시되는 일반적인 팝업 모달입니다.</p>
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
      </ModalItem>
    </div>
  );
};

// ModalProvider 사용 예시
const ModalProviderExample = () => {
  const { showModal } = useModal();

  const handleShowConfirm = () => {
    showModal(
      <div className="p-4 min-w-[300px]">
        <h2 className="text-lg font-bold mb-2">확인 다이얼로그</h2>
        <p>정말 삭제하시겠습니까?</p>
        <div className="flex gap-2 mt-6">
          <Button variant="secondary" className="flex-1">
            취소
          </Button>
          <Button variant="primary" className="flex-1">
            삭제
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <Button onClick={handleShowConfirm}>확인 다이얼로그 열기</Button>
    </div>
  );
};

export const BottomSheet: Story = {
  render: () => <BottomSheetExample />,
};

export const PopupModal: Story = {
  render: () => <PopupModalExample />,
};

export const ModalProvider: Story = {
  render: () => (
    <ModalProviderComponent>
      <ModalProviderExample />
    </ModalProviderComponent>
  ),
};