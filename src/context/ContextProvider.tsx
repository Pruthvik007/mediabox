import { ModalProvider } from "./ModalContext";
import WatchListProvider from "./WatchListContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalProvider>
        <WatchListProvider>{children}</WatchListProvider>
      </ModalProvider>
    </>
  );
};

export default ContextProvider;
