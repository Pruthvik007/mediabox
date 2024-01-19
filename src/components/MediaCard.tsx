import { useState } from "react";
import { CONSTANTS, posterSize } from "../helpers/Constants";
import { Movie, Show } from "../types/TmdbTypes";
import Skeleton from "./common/Skeleton";
type MediaCardProps = {
  media: Movie | Show;
};
const MediaCard = ({ media }: MediaCardProps) => {
  const imagePath = media.poster_path ? media.poster_path : media.backdrop_path;
  const alt = (media as Movie).title
    ? (media as Movie).title
    : (media as Show).name;
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="card-sm md:card-md lg:card-lg overflow-y-clip relative">
      {imagePath ? (
        <img
          src={CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.lg + imagePath}
          alt={alt}
          style={{
            filter: `${isLoading ? "blur(20px)" : ""}`,
            transition: "1s filter linear",
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          height="100%"
          width="100%"
          srcSet={`${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.sm + imagePath
          } 300w, ${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.md + imagePath
          } 768w, ${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.lg + imagePath
          } 1280w`}
          sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
        />
      ) : (
        <div className="relative">
          <Skeleton />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {alt}
          </p>
        </div>
      )}
      {media.vote_average !== 0 && (
        <div className="absolute top-1 right-1">
          <div className="badge badge-xs sm:badge-sm md:badge-md lg:badge-lg badge-neutral">
            {media.vote_average.toFixed(1)}/10
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCard;
