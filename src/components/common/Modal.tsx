import { ReactNode, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const ModalHeader = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useContext(ModalContext);
  return (
    <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
      {children}
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="default-modal"
        onClick={closeModal}
      >
        <span>Close</span>
      </button>
    </div>
  );
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 md:p-3 space-y-4 flex flex-col items-center">
      {children}
    </div>
  );
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  const { closeModal } = useContext(ModalContext);
  return (
    <div className="flex items-center p-2 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
      {children}
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={closeModal}
      >
        <span>Close</span>
      </button>
    </div>
  );
};

const Modal = () => {
  const { isVisible, modalContent } = useContext(ModalContext);
  return (
    <>
      {isVisible && (
        <div
          id="default-modal"
          tabIndex={-1}
          className="w-screen h-screen bg-opacity-70 bg-base-300 p-5 fixed top-0 flex justify-center items-center overflow-y-auto overflow-x-hidden right-0 left-0 z-50 md:inset-0 max-h-full"
        >
          <div className="relative rounded-lg shadow bg-neutral p-2 w-full max-w-2xl max-h-full">
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
