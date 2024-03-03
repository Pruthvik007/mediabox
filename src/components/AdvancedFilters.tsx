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
          { value: "popularity.desc", label: "High To Low" },
          { value: "popularity.asc", label: "Low To High" },
        ]}
        value={params.sort_by ? params.sort_by : ""}
        onChange={(value) =>
          setParams({
            ...params,
            sort_by: value,
          })
        }
      />
    </div>
  );
};

export default AdvancedFilters;
