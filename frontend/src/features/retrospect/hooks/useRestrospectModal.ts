import { useState } from 'react';
import { Emotion } from '@/constants/emotion';
import { useModal } from '@/hooks/useModal';

export const useRetrospectModal = () => {
  const { isOpen, openModal, closeModal: closeGenericModal } = useModal();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion['id'] | ''>('');
  const [retrospectText, setRetrospectText] = useState('');

  const closeModal = () => {
    closeGenericModal();
    setSelectedEmotion('');
    setRetrospectText('');
  };

  const onSubmit = () => {
    closeModal();
  };

  return {
    isOpen,
    selectedEmotion,
    retrospectText,
    setSelectedEmotion,
    setRetrospectText,
    openModal,
    closeModal,
    onSubmit
  };
};