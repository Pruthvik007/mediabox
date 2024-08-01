import { createContext, useState } from "react";
import { CategoryMediaParamsType } from "../types/TmdbTypes";
type FiltersContextType = {
  filters: CategoryMediaParamsType;
  updateFilters: (
    filterName: keyof CategoryMediaParamsType,
    value: string,
    displayValue?: string
  ) => void;
  clearFilters: () => void;
  activeFilterName: string;
  isFiltersActive: () => boolean;
};
export const FiltersContext = createContext<FiltersContextType>({
  filters: {} as CategoryMediaParamsType,
  updateFilters: () => {},
  clearFilters: () => {},
  activeFilterName: "",
  isFiltersActive: () => false,
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<CategoryMediaParamsType>({});
  const [activeFilterName, setActiveFilterName] = useState("");
  const isFiltersActive = () => {
    if (
      filters.with_genres ||
      filters.with_companies ||
      filters.sort_by_vote_count
    ) {
      return true;
    }
    return false;
  };
  const updateFilters = (
    filterName: keyof CategoryMediaParamsType,
    value: string,
    displayValue?: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    if (displayValue) setActiveFilterName(displayValue);
  };
  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      with_genres: "",
      with_companies: "",
      sort_by_vote_count: "",
    }));
    setActiveFilterName("");
  };
  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
        activeFilterName,
        clearFilters,
        isFiltersActive,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
