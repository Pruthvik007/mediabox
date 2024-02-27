import { useState } from "react";
import MediaSelector from "../components/MediaSelector";
import { MediaType } from "../types/TmdbTypes";
import useWatchList from "../hooks/useWatchList";
import MediaList from "../components/MediaList";

const WatchList = () => {
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const { watchList } = useWatchList();
  return (
    <div className="p-5 h-[calc(100vh-4rem)] space-y-5">
      <MediaSelector mediaType={mediaType} setMediaType={setMediaType} />
      <div className="flex flex-wrap bg-neutral gap-3 pt-5 px-3">
        {mediaType === "movies" && (
          <MediaList mediaType={mediaType} mediaList={watchList.movies} />
        )}
        {mediaType === "shows" && (
          <MediaList mediaType={mediaType} mediaList={watchList.shows} />
        )}
      </div>
    </div>
  );
};

export default WatchList;
