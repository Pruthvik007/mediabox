import { useState } from "react";
import MediaSelector from "../components/MediaSelector";
import { MediaType } from "../types/TmdbTypes";
import { useWatchList } from "../hooks/useWatchList";
import MediaList from "../components/MediaList";

const WatchList = () => {
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const { watchList } = useWatchList();
  const mediaList = watchList[mediaType];
  const isEmpty = mediaList.length === 0;

  return (
    <div className="p-5 rounded-xl space-y-5 flex flex-col">
      <MediaSelector
        className="mx-auto"
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
      {isEmpty ? (
        <p className="text-xl font-bold text-yellow-500 mx-auto">
          No {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Added To
          Watchlist!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 p-3 gap-3 bg-base-100 max-w-fit rounded-xl mx-auto">
          <MediaList mediaType={mediaType} mediaList={mediaList} />
        </div>
      )}
    </div>
  );
};

export default WatchList;
