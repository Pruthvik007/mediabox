import { ID_PLACEHOLDER } from "../helpers/Constants";
import { fetchApi } from "../helpers/Fetch";
import TmdbHelper from "../helpers/TmdbHelper";
import {
  CategoryMediaParamsType,
  Genre,
  Media,
  MediaDetails,
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
      return fetchApi<Response<Media>>(
        endPoint + "?" + TmdbHelper.getCategoryMediaParams(params)
      );
    }
  }
  getMediaDetails(endPoint: string, id: string): Promise<MediaDetails> {
    return fetchApi<MovieDetails | ShowDetails>(`${endPoint}${id}`);
  }
  getMediaSearchResults(
    endPoint: string,
    params: SearchMediaParamsType
  ): Promise<Response<Media>> {
    return fetchApi<Response<Media>>(
      endPoint + "?" + TmdbHelper.getQueryParams(params)
    );
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
