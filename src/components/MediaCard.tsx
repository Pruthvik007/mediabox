import {
  Media,
  MediaDetails,
  MediaType,
  MovieDetails,
  ShowDetails,
} from "../types/TmdbTypes";
import WatchlistButtons from "./WatchlistButtons";
import TmdbImage from "./common/TmdbImage";
type MediaCardProps = {
  media: Media;
  mediaType: MediaType;
};
const MediaCard = ({ media, mediaType }: MediaCardProps) => {
  const imagePath = media.poster_path ? media.poster_path : media.backdrop_path;
  const alt =
    (media as MovieDetails).title ||
    (media as ShowDetails).name ||
    media.id.toString();
  return (
    <div className="relative group">
      <div className="card-sm md:card-md lg:card-lg overflow-y-clip">
        <TmdbImage imagePath={imagePath} alt={alt} />
      </div>
      {media.vote_average !== 0 && (
        <div className="absolute top-1 right-1 badge badge-xs sm:badge-sm md:badge-md lg:badge-lg badge-neutral rounded-full">
          {media.vote_average.toFixed(1)}
        </div>
      )}
      <WatchlistButtons
        mediaDetails={media as MediaDetails}
        mediaType={mediaType}
        asIcons
        className="block lg:hidden lg:group-hover:block absolute bottom-1 right-1"
      />
    </div>
  );
};

export default MediaCard;
