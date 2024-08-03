import { memo } from "react";
import { MediaType } from "../types/TmdbTypes";

type MediaSelectorProps = {
  mediaType: MediaType;
  setMediaType: (mediaType: MediaType) => void;
  className?: string;
};
const MediaSelector = memo(
  ({ mediaType, setMediaType, className }: MediaSelectorProps) => {
    return (
      <div className={`flex gap-2 ${className}`}>
        <button
          className={`btn hover:btn-info btn-sm lg:btn-md ${
            mediaType === "movies" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setMediaType("movies")}
        >
          Movies
        </button>
        <button
          className={`btn hover:btn-info btn-sm lg:btn-md ${
            mediaType === "shows" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setMediaType("shows")}
        >
          Series
        </button>
      </div>
    );
  }
);

export default MediaSelector;
