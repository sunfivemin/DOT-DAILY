'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskFormModal from '@/features/myday/components/TaskFormModal';
import { useRetrospectModal } from '@/features/retrospect/hooks/useRestrospectModal';
import RetrospectModal from '@/features/retrospect/components/RetrospectModal';
import DateNavigationModal from '@/features/retrospect/components/DateNavigationModal';

export type ModalName = 'taskForm' | 'retrospectForm' | 'DateNavigationForm' | null;

export interface TaskFormModalProps {
  defaultDate?: string;
}

interface ModalContextType {
  modalName: ModalName;
  modalProps: TaskFormModalProps | null;
  openModal: (name: ModalName, props?: TaskFormModalProps) => void;
  closeModal: () => void;
}

const FullScreenModalContext = createContext<ModalContextType | undefined>(undefined);

export const FullScreenModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalName, setModalName] = useState<ModalName>(null);
  const [modalProps, setModalProps] = useState<TaskFormModalProps | null>(null);

  const openModal = useCallback((name: ModalName, props?: TaskFormModalProps) => {
    setModalName(name);
    setModalProps(props || null);
  }, []);

  const closeModal = useCallback(() => {
    setModalName(null);
    setModalProps(null);
  }, []);

  return (
    <FullScreenModalContext.Provider value={{ modalName, modalProps, openModal, closeModal }}>
      {children}
      <FullScreenModalRenderer />
    </FullScreenModalContext.Provider>
  );
};

export const useFullScreenModal = () => {
  const context = useContext(FullScreenModalContext);
  if (!context) {
    throw new Error('useFullScreenModal must be used within a FullScreenModalProvider');
  }
  return context;
};

const FullScreenModalRenderer = () => {
  const { modalName, modalProps, closeModal } = useFullScreenModal();
  const retrospectModal = useRetrospectModal();

  return (
    <AnimatePresence>
      {modalName === 'taskForm' && (
        <TaskFormModal onClose={closeModal} {...modalProps} />
      )}
      {modalName === 'retrospectForm' && (
        <RetrospectModal
          selectedEmotion={retrospectModal.selectedEmotion}
          retrospectText={retrospectModal.retrospectText}
          onEmotionSelect={retrospectModal.setSelectedEmotion}
          onTextChange={retrospectModal.setRetrospectText}
          onClose={retrospectModal.closeModal}
          onSubmit={retrospectModal.onSubmit}
        />
      )}
      {modalName === 'DateNavigationForm' && (
        <DateNavigationModal onClose={closeModal} />
      )}
    </AnimatePresence>
  );
};