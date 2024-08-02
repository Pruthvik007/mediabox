import {
  CategoryMediaParamsType,
  Media,
  MediaType,
  Movie,
  QueryParamsType,
  Show,
  VideosResponse,
} from "../types/TmdbTypes";
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

  getOfficialTrailer(videos: VideosResponse | undefined) {
    const trailerData = videos?.results
      .sort((v1, v2) => v1.name.localeCompare(v2.name))
      .find(
        (result) =>
          result.official &&
          result.site === "YouTube" &&
          result.type === "Trailer" &&
          result.name.toLowerCase().includes("trailer")
      );
    return {
      name: trailerData?.name,
      id: trailerData?.key,
    };
  }

  getMediaTitle(media: Media, mediaType: MediaType) {
    return mediaType === "movies"
      ? (media as Movie).original_title
      : (media as Show).original_name;
  }
}
export default new TmdbHelper();
