"use client";

import { WatchListProvider } from "@/context/watchlist-context";
import { ModalProvider } from "@/context/modal-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <WatchListProvider>{children}</WatchListProvider>
    </ModalProvider>
  );
}
