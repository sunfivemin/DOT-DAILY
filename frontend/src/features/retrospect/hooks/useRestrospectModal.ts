import { useFullScreenModal } from '@/components/ui/Modal/providers/FullScreenModalProvider';
import { useRetrospectStore } from '@/store/useRestrospectStore';
import { useDateStore } from '@/store/useDateStore';
import { Emotion } from '@/constants/emotion';
import { addDailyEmotionMemo } from '../api';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export const useRetrospectModal = () => {
  const { closeModal: closeFullScreenModal } = useFullScreenModal();
  const { addEmotionMemo } = useRetrospectStore();
  const { selectedDate } = useDateStore();
  const { showToast } = useToast();

  const closeModal = () => {
    closeFullScreenModal();
  };

  const onSubmit = async (emotion: Emotion['id'] | '', retrospectText: string) => {
    const newMemo = {
      date: selectedDate,
      emotion: emotion as Emotion['id'],
      memo: retrospectText,
    }
    addEmotionMemo(newMemo);
    await addDailyEmotionMemo(newMemo);
    showToast('회고가 성공적으로 작성되었습니다.');
    closeModal();
  };

  return {
    closeModal,
    onSubmit
  };
}; 