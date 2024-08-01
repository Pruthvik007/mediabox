import { FilterProvider } from "./FiltersContext";
import { ModalProvider } from "./ModalContext";
import WatchListProvider from "./WatchListContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalProvider>
        <WatchListProvider>
          <FilterProvider>{children}</FilterProvider>
        </WatchListProvider>
      </ModalProvider>
    </>
  );
};

export default ContextProvider;
