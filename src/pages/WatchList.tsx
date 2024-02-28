import { useState } from "react";
import MediaSelector from "../components/MediaSelector";
import { MediaType } from "../types/TmdbTypes";
import useWatchList from "../hooks/useWatchList";
import MediaList from "../components/MediaList";

const WatchList = () => {
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const { watchList } = useWatchList();
  return (
    <div className="p-5 rounded-xl space-y-5 flex flex-col">
      <MediaSelector mediaType={mediaType} setMediaType={setMediaType} />
      <div className="rounded-xl flex flex-wrap bg-neutral gap-5 justify-start p-3">
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
