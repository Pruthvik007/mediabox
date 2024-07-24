import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Filters from "../components/Filters";
import MediaList from "../components/MediaList";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { useSearchResults } from "../hooks/TmdbQueries";
import { MediaType, SearchMediaParamsType } from "../types/TmdbTypes";
import ErrorPage from "./ErrorPage";

const SearchPage = () => {
  const { ref, inView } = useInView();
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const [params, setParams] = useState<SearchMediaParamsType>({
    page: 1,
    query: "",
    include_adult: false,
  });
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useSearchResults(mediaType, params);

  useEffect(() => {
    if (inView && params.query.length > 0) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  if (error) return <ErrorPage />;
  return (
    <div className="p-3 space-y-3">
      <p className="text-2xl md:text-3xl font-bold text-center py-3 text-neutral-content">
        Search For Movies And TV Series
      </p>
      <Filters
        className="p-3"
        params={params}
        setParams={setParams}
        mediaType={mediaType}
        setMediaType={setMediaType}
      />
      {data !== undefined && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-3 gap-3 bg-neutral max-w-fit rounded-xl mx-auto">
          {data.pages.map((page, i) => (
            <MediaList
              key={i}
              mediaList={page.results}
              mediaType={mediaType as MediaType}
              isLoading={isFetching || isFetchingNextPage}
            />
          ))}
        </div>
      )}
      <div id="observer" ref={ref}></div>
      <ScrollToTopButton />
    </div>
  );
};

export default SearchPage;
