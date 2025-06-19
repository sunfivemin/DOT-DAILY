import { useState } from 'react';
import { Emotion } from '@/constants/emotion';
import { useFullScreenModal } from '@/components/ui/FullScreenModal/FullScreenModalProvider';

export const useRetrospectModal = () => {
  const { closeModal: closeFullScreenModal } = useFullScreenModal();

  const [selectedEmotion, setSelectedEmotion] = useState<Emotion['id'] | ''>('');
  const [retrospectText, setRetrospectText] = useState('');

  const closeModal = () => {
    closeFullScreenModal();
    setSelectedEmotion('');
    setRetrospectText('');
  };

  const onSubmit = () => {
    closeModal();
  };

  return {
    selectedEmotion,
    retrospectText,
    setSelectedEmotion,
    setRetrospectText,
    closeModal,
    onSubmit
  };
};