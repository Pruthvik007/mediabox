import { Movie, Show } from "../types/TmdbTypes";
import TmdbImage from "./common/TmdbImage";
type MediaCardProps = {
  media: Movie | Show;
};
const MediaCard = ({ media }: MediaCardProps) => {
  const imagePath = media.poster_path ? media.poster_path : media.backdrop_path;
  const alt = (media as Movie).title
    ? (media as Movie).title
    : (media as Show).name;
  return (
    <div className="relative">
      <TmdbImage imagePath={imagePath} alt={alt} />
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
