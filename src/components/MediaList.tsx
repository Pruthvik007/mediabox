import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";
import TmdbHelper from "../helpers/TmdbHelper";
import { Media, MediaType } from "../types/TmdbTypes";
import Skeleton from "./common/Skeleton";
import MediaCard from "./MediaCard";

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
          to={`${CONSTANTS.ENV.BASE_URL}details/${mediaType}/${media.id}`}
          key={media.id}
          title={`View ${TmdbHelper.getMediaTitle(media, mediaType)} ${
            mediaType === "movies" ? "Movie" : "Show"
          } Details`}
        >
          <MediaCard media={media} mediaType={mediaType} />
        </Link>
      ))}
      {isLoading && <Skeleton count={20} className="media-card" />}
    </>
  );
};
export default MediaList;
