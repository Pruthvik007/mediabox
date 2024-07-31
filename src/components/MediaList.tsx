import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";
import { Media, MediaType } from "../types/TmdbTypes";
import MediaCard from "./MediaCard";

const MediaList = ({
  mediaList,
  mediaType,
}: {
  mediaList: Media[] | undefined;
  mediaType: MediaType;
}) => {
  return (
    <>
      {mediaList?.slice(0, 10).map((media) => (
        <Link
          to={`${CONSTANTS.ENV.BASE_URL}details/${mediaType}/${media.id}`}
          key={media.id}
        >
          <MediaCard media={media} mediaType={mediaType} imageLoading="eager" />
        </Link>
      ))}
      {mediaList?.slice(10).map((media) => (
        <Link
          to={`${CONSTANTS.ENV.BASE_URL}details/${mediaType}/${media.id}`}
          key={media.id}
        >
          <MediaCard media={media} mediaType={mediaType} imageLoading="lazy" />
        </Link>
      ))}
    </>
  );
};
export default MediaList;
