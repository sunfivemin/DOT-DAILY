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


export type ModalName = 'taskForm' | null;

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

  return (
    <AnimatePresence>
      {modalName === 'taskForm' && (
        <TaskFormModal onClose={closeModal} {...modalProps} />
      )}
    </AnimatePresence>
  );
};