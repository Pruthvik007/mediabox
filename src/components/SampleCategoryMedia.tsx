import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CONSTANTS,
  END_POINT_OF_MEDIA_OF_CATEGORY,
} from "../helpers/Constants";
import { useSampleMedia } from "../hooks/TmdbQueries";
import { MediaType } from "../types/TmdbTypes";
import MediaList from "./MediaList";
import MediaSelector from "./MediaSelector";

type SampleCategoryMediaProps = {
  category:
    | keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.movies
    | keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.shows;
};
const SampleCategoryMedia = ({ category }: SampleCategoryMediaProps) => {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const { isLoading, data } = useSampleMedia(mediaType, category);

  return (
    <div className="flex flex-col gap-3 p-3 bg-neutral rounded-xl">
      <div className="w-full flex place-content-between items-center">
        <div className="flex gap-4  items-center">
          <p className="text-md lg:text-lg font-bold text">
            {CONSTANTS.CATEGORIES[category]}
          </p>
          <MediaSelector mediaType={mediaType} setMediaType={setMediaType} />
        </div>
        <button
          onClick={() =>
            navigate(`${CONSTANTS.ENV.BASE_URL}/media/${mediaType}/${category}`)
          }
          className="btn btn-active btn-primary btn-sm md:btn-sm lg:btn-md"
        >
          View More
        </button>
      </div>
      <div className="flex gap-3 scrollbar-hidden">
        <MediaList
          mediaList={data?.results}
          mediaType={mediaType}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SampleCategoryMedia;
