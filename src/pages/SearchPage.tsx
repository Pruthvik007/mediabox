import React, { useState } from "react";
import Filters from "../components/Filters";
import MediaList from "../components/MediaList";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { useSearchResults } from "../hooks/TmdbQueries";
import { MediaType, SearchMediaParamsType } from "../types/TmdbTypes";
import ErrorPage from "./ErrorPage";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const SearchPage = () => {
  const [mediaType, setMediaType] = useState<MediaType>("MOVIES");
  const [params, setParams] = useState<SearchMediaParamsType>({
    page: 1,
    query: "",
    include_adult: false,
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSearchResults(mediaType, params);

  useInfiniteScroll(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });
  if (error) return <ErrorPage />;
  return (
    <div className="container px-3">
      <p className="text-3xl font-bold text-center py-3">
        Search For Movies And TV Series
      </p>
      <Filters
        classNames="mb-5"
        params={params}
        setParams={setParams}
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
      <div className="flex flex-wrap gap-3 justify-center bg-neutral">
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

export default SearchPage;
