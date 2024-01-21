import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { MediaType, SearchMediaParamsType } from "../types/TmdbTypes";
import MediaSelector from "./MediaSelector";

const Filters = ({
  params,
  setParams,
  mediaType,
  setMediaType,
  classNames = "",
}: {
  params: SearchMediaParamsType;
  setParams: (params: SearchMediaParamsType) => void;
  mediaType: MediaType;
  setMediaType: (mediaType: MediaType) => void;
  classNames?: string;
}) => {
  const [query, setQuery] = useState("");
  const debouncedQueryValue = useDebounce<string>(query, 700);
  useEffect(() => {
    setParams({ ...params, query: debouncedQueryValue });
  }, [debouncedQueryValue]);
  return (
    <div
      className={`flex flex-row gap-3 bg-base-100 p-5 w-full justify-center border-black rounded-lg items-center ${classNames}`}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full max-w-xs input-sm md:input-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <MediaSelector mediaType={mediaType} setMediaType={setMediaType} />
    </div>
  );
};

export default Filters;
