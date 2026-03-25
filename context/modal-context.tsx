"use client";

import { createContext, useCallback, useState } from "react";

type ModalContextType = {
  isVisible: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  isVisible: false,
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const openModal = useCallback((content: React.ReactNode) => {
    setModalContent(content);
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ isVisible, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
