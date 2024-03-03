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
        <MediaCard key={media.id} media={media} mediaType={mediaType} />
      ))}
      {isLoading && (
        <Skeleton count={20} className="card-sm md:card-md lg:card-lg" />
      )}
    </>
  );
};

export default MediaList;
