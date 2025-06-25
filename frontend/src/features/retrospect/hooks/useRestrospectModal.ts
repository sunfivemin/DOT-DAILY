import { useFullScreenModal } from '@/components/ui/FullScreenModal/FullScreenModalProvider';

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