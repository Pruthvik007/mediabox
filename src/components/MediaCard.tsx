import {
  Media,
  MediaDetails,
  MediaType,
  MovieDetails,
  ShowDetails,
} from "../types/TmdbTypes";
import WatchlistButtons from "./WatchlistButtons";
import Image from "./common/Image";
import { useInView } from "react-intersection-observer";
import Skeleton from "./common/Skeleton";
import { memo } from "react";
type MediaCardProps = {
  media: Media;
  mediaType: MediaType;
};

const MediaCard = memo(({ media, mediaType }: MediaCardProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const imagePath = media.poster_path ? media.poster_path : media.backdrop_path;
  const alt =
    (media as MovieDetails).title ||
    (media as ShowDetails).name ||
    media.id.toString();

  return (
    <div ref={ref} className={`relative group`}>
      {inView ? (
        <>
          <Image className="media-card" imagePath={imagePath} alt={alt} />
          {media.vote_average !== undefined && media.vote_average !== 0 && (
            <div className="absolute top-1 right-2 badge badge-xs sm:badge-sm md:badge-md lg:badge-lg badge-neutral rounded-full">
              {media.vote_average.toFixed(1)}
            </div>
          )}
          <WatchlistButtons
            mediaDetails={media as MediaDetails}
            mediaType={mediaType}
            asIcons
            className="block lg:hidden lg:group-hover:block absolute bottom-1 right-2"
          />
        </>
      ) : (
        <Skeleton className="media-card" />
      )}
    </div>
  );
});

export default MediaCard;
