"use client";

import { createContext, useCallback, useState } from "react";
import { storageGet, storageSet } from "@pruthvik007/utils";
import type { Media, MediaType } from "@/lib/tmdb/types";

type WatchList = {
  movies: Media[];
  shows: Media[];
};

type WatchListContextType = {
  watchList: WatchList;
  addMedia: (media: Media, mediaType: MediaType) => void;
  removeMedia: (media: Media, mediaType: MediaType) => void;
  isInWatchlist: (mediaId: number, mediaType: MediaType) => boolean;
};

export const WatchListContext = createContext<WatchListContextType>({
  watchList: { movies: [], shows: [] },
  addMedia: () => {},
  removeMedia: () => {},
  isInWatchlist: () => false,
});

export function WatchListProvider({ children }: { children: React.ReactNode }) {
  const [watchList, setWatchList] = useState<WatchList>(() =>
    storageGet<WatchList>("watchlist", { movies: [], shows: [] })
  );

  const addMedia = useCallback((media: Media, mediaType: MediaType) => {
    setWatchList((prev) => {
      const updated = {
        ...prev,
        [mediaType]: [...prev[mediaType], media],
      };
      storageSet("watchlist", updated);
      return updated;
    });
  }, []);

  const removeMedia = useCallback((media: Media, mediaType: MediaType) => {
    setWatchList((prev) => {
      const updated = {
        ...prev,
        [mediaType]: prev[mediaType].filter((m) => m.id !== media.id),
      };
      storageSet("watchlist", updated);
      return updated;
    });
  }, []);

  const isInWatchlist = useCallback(
    (mediaId: number, mediaType: MediaType) => {
      return watchList[mediaType].some((m) => m.id === mediaId);
    },
    [watchList]
  );

  return (
    <WatchListContext.Provider
      value={{ watchList, addMedia, removeMedia, isInWatchlist }}
    >
      {children}
    </WatchListContext.Provider>
  );
}
