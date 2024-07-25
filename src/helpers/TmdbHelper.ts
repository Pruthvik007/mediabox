import { CategoryMediaParamsType, QueryParamsType } from "../types/TmdbTypes";
import { sortByTypes } from "./Constants";

class TmdbHelper {
  getCategoryMediaParams(params: CategoryMediaParamsType): string {
    let sortByCombined = "";
    const finalParams: CategoryMediaParamsType = { ...params };
    sortByTypes.forEach((param) => {
      if (finalParams[param as keyof CategoryMediaParamsType]) {
        if (sortByCombined) {
          sortByCombined += ",";
        }
        sortByCombined += finalParams[param as keyof CategoryMediaParamsType];
        delete finalParams[param as keyof CategoryMediaParamsType];
      }
    });
    if (sortByCombined) {
      finalParams.sort_by = sortByCombined;
    }
    return this.getQueryParams(finalParams);
  }

  getQueryParams(params: QueryParamsType): string {
    return new URLSearchParams(
      Object.entries(params).filter(
        (q) => q[1] !== null && q[1] !== undefined && q[1] !== ""
      )
    ).toString();
  }
}
export default new TmdbHelper();
