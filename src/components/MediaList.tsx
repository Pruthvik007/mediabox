import { Link } from "react-router-dom";
import { Media, MediaType } from "../types/TmdbTypes";
import MediaCard from "./MediaCard";
import Skeleton from "./common/Skeleton";
import { CONSTANTS } from "../helpers/Constants";

const MediaList = ({
  mediaList,
  mediaType,
  isLoading,
}: {
  mediaList: Media[] | undefined;
  mediaType: MediaType;
  isLoading?: boolean;
}) => {
  return (
    <>
      {mediaList?.map((media) => (
        <Link
          to={`${CONSTANTS.ENV.BASE_URL}/details/${mediaType}/${media.id}`}
          key={media.id}
        >
          <MediaCard media={media} mediaType={mediaType} />
        </Link>
      ))}
      {isLoading && (
        <Skeleton count={20} className="card-sm md:card-md lg:card-lg" />
      )}
    </>
  );
};

export default MediaList;
