import { createContext, useState } from "react";
import { Media, MediaType } from "../types/TmdbTypes";

type WatchListContextType = {
  watchList: {
    movies: Media[];
    shows: Media[];
  };
  addMediaToWatchList: (media: Media, mediaType: MediaType) => void;
  removeMediaFromWatchList: (media: Media, mediaType: MediaType) => void;
  isMediaPresentInWatchlist: (mediaId: number, mediaType: MediaType) => boolean;
};

export const WatchListContext = createContext<WatchListContextType>({
  watchList: { movies: [], shows: [] },
  addMediaToWatchList: () => {},
  removeMediaFromWatchList: () => {},
  isMediaPresentInWatchlist: () => false,
});

type WatchList = {
  movies: Media[];
  shows: Media[];
};

const getExistingWatchList = () => {
  const watchList = localStorage.getItem("watchlist");
  return watchList ? JSON.parse(watchList) : { movies: [], shows: [] };
};

const WatchListProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchList, setWatchList] = useState<WatchList>(getExistingWatchList());
  const addMediaToWatchList = (media: Media, mediaType: MediaType) => {
    setWatchList((prev) => {
      const updatedList = {
        ...prev,
        [mediaType]: [...prev[mediaType], media],
      };
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const removeMediaFromWatchList = (media: Media, mediaType: MediaType) => {
    setWatchList((prev) => {
      const updatedList = {
        ...prev,
        [mediaType]: prev[mediaType].filter((m) => m.id !== media.id),
      };
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const isMediaPresentInWatchlist = (mediaId: number, mediaType: MediaType) => {
    return watchList[mediaType].find((m) => m.id === mediaId) !== undefined;
  };

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        addMediaToWatchList,
        removeMediaFromWatchList,
        isMediaPresentInWatchlist,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchListProvider;
