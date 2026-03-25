"use client";

import { Modal, useKeyDown } from "@pruthvik007/components";
import { useModal } from "@/hooks/use-modal";

export function ModalOutlet() {
  const { isVisible, modalContent, closeModal } = useModal();

  useKeyDown("Escape", closeModal);

  return (
    <Modal isOpen={isVisible} onClose={closeModal}>
      {modalContent}
    </Modal>
  );
}
