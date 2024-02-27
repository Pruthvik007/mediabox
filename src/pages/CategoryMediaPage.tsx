import React, { useEffect, useState } from "react";
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
import { useInView } from "react-intersection-observer";
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
  }, [inView, fetchNextPage]);

  if (!isValidMedia) {
    return <PageNotFound />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="p-3 flex flex-col">
      <p className="text-3xl font-bold text-center py-3 text-neutral-content">
        {`${CONSTANTS.CATEGORIES[
          category as keyof typeof CONSTANTS.CATEGORIES
        ].toUpperCase()} ${mediaType.toUpperCase()}`}
      </p>
      {category === "discover" && (
        <AdvancedFilters
          classNames="py-3"
          mediaType={mediaType as MediaType}
          params={params}
          setParams={setParams}
        />
      )}
      <div className="flex flex-wrap justify-around bg-neutral gap-0.5">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            <MediaList
              mediaList={page.results}
              mediaType={mediaType as MediaType}
              isLoading={isFetching || isFetchingNextPage}
            />
          </React.Fragment>
        ))}
      </div>
      <div id="observer" ref={ref}></div>
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryMedia;
