"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ModalItem from "../components/ModalItem";

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  showConfirm: (message: string) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    resolve: (v: boolean) => void;
  } | null>(null);

  const showModal = (content: ReactNode) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  const showConfirm = (message: string) =>
    new Promise<boolean>((resolve) => {
      setConfirmState({ open: true, message, resolve });
    });

  const handleConfirmClose = (result: boolean) => {
    if (confirmState) {
      confirmState.resolve(result);
      setConfirmState(null);
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal, showConfirm }}>
      {children}
      <ModalItem open={!!modalContent} onClose={closeModal}>
        {modalContent}
      </ModalItem>
      {confirmState && (
        <ModalItem
          open={confirmState.open}
          onClose={() => handleConfirmClose(false)}
        >
          <div className="p-6">
            <div className="mb-4 text-lg font-semibold">
              {confirmState.message}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => handleConfirmClose(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={() => handleConfirmClose(true)}
              >
                확인
              </button>
            </div>
          </div>
        </ModalItem>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function useConfirm() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useConfirm must be used within a ModalProvider");
  return context.showConfirm;
}
