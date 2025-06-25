import { useFullScreenModal } from '@/components/ui/Modal/providers/FullScreenModalProvider';

export const useRetrospectModal = () => {
  const { closeModal: closeFullScreenModal } = useFullScreenModal();

  const closeModal = () => {
    closeFullScreenModal();
  };

  const onSubmit = () => {
    closeModal();
  };

  return {
    closeModal,
    onSubmit
  };
};