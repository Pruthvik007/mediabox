import { ID_PLACEHOLDER } from "../helpers/Constants";
import { fetchApi } from "../helpers/Fetch";
import {
  CategoryMediaParamsType,
  Genre,
  Media,
  MovieDetails,
  Response,
  SearchMediaParamsType,
  ShowDetails,
  VideosResponse,
} from "../types/TmdbTypes";

class TmdbServices {
  getMedia(
    endPoint: string,
    params?: CategoryMediaParamsType
  ): Promise<Response<Media>> {
    if (!params) {
      return fetchApi<Response<Media>>(endPoint);
    } else {
      const queries = new URLSearchParams(
        Object.entries(params).filter(
          (q) => q[1] !== null && q[1] !== undefined && q[1] !== ""
        )
      ).toString();
      return fetchApi<Response<Media>>(endPoint + "?" + queries);
    }
  }
  getMediaDetails(
    endPoint: string,
    id: string
  ): Promise<MovieDetails | ShowDetails> {
    return fetchApi<MovieDetails | ShowDetails>(`${endPoint}${id}`);
  }
  getMediaSearchResults(
    endPoint: string,
    params: SearchMediaParamsType
  ): Promise<Response<Media>> {
    const queries = new URLSearchParams(
      Object.entries(params).filter(
        (q) => q[1] !== null && q[1] !== undefined && q[1] !== ""
      )
    ).toString();
    return fetchApi<Response<Media>>(endPoint + "?" + queries);
  }
  getMediaRecomendations(
    endPoint: string,
    id: string
  ): Promise<Response<Media>> {
    return fetchApi<Response<Media>>(
      `${endPoint.replace(ID_PLACEHOLDER, id.toString())}`
    );
  }

  getGenres(endPoint: string) {
    return fetchApi<{ genres: Genre[] }>(endPoint);
  }

  getVideos(endPoint: string, id: string) {
    return fetchApi<VideosResponse>(`${endPoint.replace(ID_PLACEHOLDER, id)}`);
  }
}
export default new TmdbServices();
