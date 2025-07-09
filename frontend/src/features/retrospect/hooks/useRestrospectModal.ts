import { useFullScreenModal } from '@/components/ui/Modal/providers/FullScreenModalProvider';
import { useRetrospectStore } from '@/store/useRestrospectStore';
import { useDateStore } from '@/store/useDateStore';
import { Emotion } from '@/constants/emotion';
import { addDailyEmotionMemo, updateDailyEmotionMemo, deleteDailyEmotionMemo } from '../api';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export const useRetrospectModal = () => {
  const { closeModal: closeFullScreenModal } = useFullScreenModal();
  const { addEmotionMemo, updateEmotionMemo, deleteEmotionMemo } = useRetrospectStore();
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
    showToast('회고가 성공적으로 작성되었습니다! 📝');
    closeModal();
  };

  const onUpdate = async (emotion: Emotion['id'] | '', retrospectText: string) => {
    const updatedMemo = {
      date: selectedDate,
      emotion: emotion as Emotion['id'],
      memo: retrospectText,
    }
    updateEmotionMemo(updatedMemo);
    await updateDailyEmotionMemo(updatedMemo);
    showToast('회고가 수정되었습니다! ✏️');
    closeModal();
  };

  const onDelete = async () => {
    if (confirm('정말로 이 회고를 삭제하시겠습니까?')) {
      deleteEmotionMemo(selectedDate);
      await deleteDailyEmotionMemo(selectedDate);
      showToast('회고가 삭제되었습니다! 🗑️');
      closeModal();
    }
  };

  return {
    closeModal,
    onSubmit,
    onUpdate,
    onDelete
  };
}; 