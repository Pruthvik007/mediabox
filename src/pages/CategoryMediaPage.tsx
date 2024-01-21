import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdvancedFilters from "../components/AdvancedFilters";
import MediaList from "../components/MediaList";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { CONSTANTS, CategoryType } from "../helpers/Constants";
import { useInfiniteMedia } from "../hooks/TmdbQueries";
import { CategoryMediaParamsType, MediaType } from "../types/TmdbTypes";
import ErrorPage from "./ErrorPage";
import PageNotFound from "./PageNotFound";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
const CategoryMedia = () => {
  const { mediaType, category } = useParams();
  const isValidMedia =
    mediaType !== undefined &&
    category !== undefined &&
    (mediaType.toUpperCase() === "MOVIES" ||
      mediaType.toUpperCase() === "SHOWS") &&
    category.toUpperCase() in CONSTANTS.CATEGORIES;

  const [params, setParams] = useState<CategoryMediaParamsType>({
    with_genres: "",
    sort_by: "",
    include_adult: undefined,
    year: "",
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteMedia(
    mediaType as MediaType,
    category as CategoryType,
    params
  );

  useInfiniteScroll(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  if (!isValidMedia) {
    return <PageNotFound />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="p-3 flex flex-col">
      <p className="text-3xl font-bold text-center py-3">
        {`${
          CONSTANTS.CATEGORIES[
            category.toUpperCase() as keyof typeof CONSTANTS.CATEGORIES
          ]
        } ${mediaType.toUpperCase()}`}
      </p>
      {category?.toUpperCase() === "DISCOVER" && (
        <AdvancedFilters
          classNames="py-3"
          mediaType={mediaType as MediaType}
          params={params}
          setParams={setParams}
        />
      )}
      <div className="flex flex-wrap gap-3 justify-center bg-neutral p-3">
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
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryMedia;
