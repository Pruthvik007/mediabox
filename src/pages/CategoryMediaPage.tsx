import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import AdvancedFilters from "../components/AdvancedFilters";
import MediaList from "../components/MediaList";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import Skeleton from "../components/common/Skeleton";
import { CONSTANTS } from "../helpers/Constants";
import { useInfiniteMedia } from "../hooks/TmdbQueries";
import { useFilters } from "../hooks/useFilters";
import { CategoryType, MediaType } from "../types/TmdbTypes";
import ErrorPage from "./ErrorPage";

type RouteParams = {
  mediaType: MediaType;
  category: CategoryType;
};

const CategoryMedia = () => {
  const { ref, inView } = useInView();
  const { mediaType, category } = useParams<RouteParams>();
  const isValidMedia =
    (mediaType === "movies" || mediaType === "shows") &&
    category !== undefined &&
    category in CONSTANTS.categories;

  const { filters, activeFilterName } = useFilters();

  const { data, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteMedia(
      mediaType as MediaType,
      category as CategoryType,
      filters,
      isValidMedia
    );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!isValidMedia) {
    return <ErrorPage message="Invalid Category" />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="p-3 flex flex-col gap-3 min-height-screen">
      <div className="flex flex-wrap justify-center gap-3 text-sm md:text-2xl font-bold py-3 text-neutral-content">
        <span>
          {`${CONSTANTS.categories[
            category as keyof typeof CONSTANTS.categories
          ].toUpperCase()} ${mediaType.toUpperCase()}`}
        </span>
        <span>{activeFilterName ? `(From ${activeFilterName})` : ""}</span>
      </div>
      {category === "discover" && (
        <AdvancedFilters className="py-3" mediaType={mediaType as MediaType} />
      )}
      {data &&
        (data.pages[0].total_results !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 p-3 gap-3 bg-base-100 rounded-xl mx-auto">
            {data.pages.map((page) => (
              <MediaList
                key={page.page}
                mediaList={page.results}
                mediaType={mediaType as MediaType}
              />
            ))}
            {isFetching && <Skeleton count={20} className="media-card" />}
          </div>
        ) : (
          <p className="text-sm md:text-3xl text-warning mx-auto md:whitespace-nowrap text-center">
            No Results Found For Given Category
          </p>
        ))}
      {data && data.pages.length >= 1 && <div id="observer" ref={ref}></div>}
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryMedia;
