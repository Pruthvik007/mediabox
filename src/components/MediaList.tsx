import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";
import { Media, MediaType } from "../types/TmdbTypes";
import MediaCard from "./MediaCard";
import Skeleton from "./common/Skeleton";

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
          to={`/${CONSTANTS.ENV.BASE_URL}/details/${mediaType}/${media.id}`}
          key={media.id}
        >
          <MediaCard media={media} mediaType={mediaType} />
        </Link>
      ))}
      {isLoading && <Skeleton count={20} />}
    </>
  );
};

export default MediaList;
