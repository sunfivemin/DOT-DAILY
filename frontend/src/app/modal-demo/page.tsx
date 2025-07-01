'use client';

import { useState } from 'react';
import { useFullScreenModal } from '@/components/ui/Modal/providers/FullScreenModalProvider';
import { useModal } from '@/components/ui/Modal/providers/ModalProvider';
import BottomSheetModal from '@/components/ui/Modal/components/BottomSheetModal';
import { Button } from '@/components/ui/Button/Button';
import MobileLayout from '@/components/layout/MobileLayout';
import { FullScreenModalProvider } from '@/components/ui/Modal/providers/FullScreenModalProvider';

export default function ModalDemoPage() {
  // FullScreenModalProvider 기반
  const { openModal } = useFullScreenModal();
  // 일반 ModalProvider 기반
  const { showModal, closeModal } = useModal();
  // 바텀시트
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MobileLayout headerTitle="모달 데모">
        <FullScreenModalProvider>
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">모달 데모 페이지</h1>
            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => openModal('taskForm', { defaultDate: '2025-06-20' })}
              >
                FullScreenModal (할 일 추가) 열기
              </Button>
              <Button
                variant="secondary"
                onClick={() => openModal('retrospectForm')}
              >
                FullScreenModal (회고 작성) 열기
              </Button>
              <Button
                variant="secondary"
                onClick={() => openModal('dateNavigationForm')}
              >
                FullScreenModal (날짜 네비게이션) 열기
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  showModal(
                    <div className="p-6 text-center">
                      <h2 className="text-lg font-bold mb-2">일반 팝업 모달</h2>
                      <p className="mb-4">이것은 ModalProvider로 띄운 팝업입니다.</p>
                      <Button variant="primary" onClick={closeModal}>
                        닫기
                      </Button>
                    </div>
                  )
                }
              >
                일반 Modal (팝업) 열기
              </Button>
              <Button
                variant="outline"
                onClick={() => setBottomSheetOpen(true)}
              >
                BottomSheetModal (바텀시트) 열기
              </Button>
              
            </div>

            {/* 바텀시트 */}
            <BottomSheetModal open={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
              <div className="p-6 text-center">
                <h2 className="text-lg font-bold mb-2">바텀시트 모달</h2>
                <p className="mb-4">이것은 BottomSheetModal입니다.</p>
                <Button variant="primary" onClick={() => setBottomSheetOpen(false)}>
                  닫기
                </Button>
              </div>
            </BottomSheetModal>

          </div>
        </FullScreenModalProvider>
      </MobileLayout>
    </div>
  );
} 