'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ModalItem from './ModalItem';

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <ModalItem open={!!modalContent} onClose={closeModal}>
        {modalContent}
      </ModalItem>
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
