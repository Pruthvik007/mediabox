import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import AdvancedFilters from "../components/AdvancedFilters";
import MediaList from "../components/MediaList";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { CONSTANTS } from "../helpers/Constants";
import { useInfiniteMedia } from "../hooks/TmdbQueries";
import {
  CategoryMediaParamsType,
  CategoryType,
  MediaType,
} from "../types/TmdbTypes";
import ErrorPage from "./ErrorPage";
import PageNotFound from "./PageNotFound";
const CategoryMedia = () => {
  const { ref, inView } = useInView();
  const { mediaType, category } = useParams();
  const isValidMedia =
    mediaType !== undefined &&
    category !== undefined &&
    (mediaType === "movies" || mediaType === "shows") &&
    category in CONSTANTS.CATEGORIES;

  const [params, setParams] = useState<CategoryMediaParamsType>({
    with_genres: "",
    sort_by: "",
    include_adult: undefined,
    year: "",
  });

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteMedia(mediaType as MediaType, category as CategoryType, params);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!isValidMedia) {
    return <PageNotFound />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="p-3 flex flex-col gap-3">
      <p className="text-3xl font-bold text-center py-3 text-neutral-content">
        {`${CONSTANTS.CATEGORIES[
          category as keyof typeof CONSTANTS.CATEGORIES
        ].toUpperCase()} ${mediaType.toUpperCase()}`}
      </p>
      {category === "discover" && (
        <AdvancedFilters
          className="py-3"
          mediaType={mediaType as MediaType}
          params={params}
          setParams={setParams}
        />
      )}
      <div className="flex flex-wrap justify-around bg-neutral gap-x-0.5 gap-y-2 p-2 rounded-xl">
        {data?.pages.map((page, i) => (
          <MediaList
            key={i}
            mediaList={page.results}
            mediaType={mediaType as MediaType}
            isLoading={isFetching || isFetchingNextPage}
          />
        ))}
      </div>
      {data && data.pages.length >= 1 && <div id="observer" ref={ref}></div>}
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryMedia;
