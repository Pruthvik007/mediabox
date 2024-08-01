import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";

export const useFilters = () => useContext(FiltersContext);
