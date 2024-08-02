import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";
import { Media, MediaType } from "../types/TmdbTypes";
import MediaCard from "./MediaCard";
import TmdbHelper from "../helpers/TmdbHelper";

const MediaList = ({
  mediaList,
  mediaType,
}: {
  mediaList: Media[] | undefined;
  mediaType: MediaType;
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
    </>
  );
};
export default MediaList;
