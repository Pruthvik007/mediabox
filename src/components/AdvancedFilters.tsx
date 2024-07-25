import { QUERY_TYPE } from "../helpers/Constants";
import { CategoryMediaParamsType, MediaType } from "../types/TmdbTypes";
import Genres from "./Genres";
import Dropdown from "./common/Dropdown";

type AdvancedFiltersProps = {
  className?: string;
  mediaType: MediaType;
  params: CategoryMediaParamsType;
  setParams: (params: CategoryMediaParamsType) => void;
};

const AdvancedFilters = ({
  className = "",
  mediaType,
  params,
  setParams,
}: AdvancedFiltersProps) => {
  return (
    <div
      className={`flex gap-3 bg-base-100 p-5 w-full justify-center border-black rounded-lg ${className}`}
    >
      <Genres
        mediaType={mediaType}
        value={params.with_genres ? params.with_genres : ""}
        onChange={(value) =>
          setParams({
            ...params,
            with_genres: value,
          })
        }
      />
      <Dropdown
        label="Sort By Popularity"
        options={[
          {
            value: QUERY_TYPE.SORT_BY.VOTE_COUNT_DESC,
            label: "Descending",
          },
          {
            value: QUERY_TYPE.SORT_BY.VOTE_COUNT_ASC,
            label: "Ascending",
          },
        ]}
        value={params.sort_by_vote_count ? params.sort_by_vote_count : ""}
        onChange={(value) =>
          setParams({
            ...params,
            sort_by_vote_count: value,
          })
        }
      />
    </div>
  );
};

export default AdvancedFilters;
