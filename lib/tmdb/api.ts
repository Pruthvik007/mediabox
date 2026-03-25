import { createLogger } from "@pruthvik007/utils";
import type {
  TmdbResponse,
  Media,
  MovieDetails,
  ShowDetails,
  Genre,
  VideosResponse,
  MediaType,
  CategoryType,
  CategoryMediaParams,
  SearchMediaParams,
} from "./types";
import {
  ENDPOINTS,
  DETAIL_ENDPOINTS,
  SEARCH_ENDPOINTS,
  GENRE_ENDPOINTS,
} from "./constants";
import { buildCategoryParams } from "./helpers";

const logger = createLogger("tmdb-api");
const TMDB_BASE = "https://api.themoviedb.org/3";

async function tmdbFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${TMDB_BASE}/${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }

  const apiKey = process.env.TMDB_API_KEY!;
  const isBearer = apiKey.startsWith("ey");
  const headers: Record<string, string> = isBearer
    ? { Authorization: `Bearer ${apiKey}` }
    : {};
  if (!isBearer) {
    url.searchParams.set("api_key", apiKey);
  }

  const res = await fetch(url.toString(), { headers, next: { revalidate: 86400 } });
  if (!res.ok) {
    logger.error({ status: res.status, path }, "TMDB API error");
    throw new Error(`TMDB API error: ${res.status}`);
  }
  return res.json();
}

export async function getMediaByCategory(
  mediaType: MediaType,
  category: CategoryType,
  params?: CategoryMediaParams
): Promise<TmdbResponse<Media>> {
  const endpoint = ENDPOINTS[mediaType][category];
  const queryParams = params ? buildCategoryParams(params) : undefined;
  return tmdbFetch(endpoint, queryParams);
}

export async function getMediaDetails(
  mediaType: MediaType,
  id: string
): Promise<MovieDetails | ShowDetails> {
  const base = DETAIL_ENDPOINTS[mediaType];
  return tmdbFetch(`${base}/${id}`);
}

export async function getRecommendations(
  mediaType: MediaType,
  id: string
): Promise<TmdbResponse<Media>> {
  const base = DETAIL_ENDPOINTS[mediaType];
  return tmdbFetch(`${base}/${id}/similar`);
}

export async function getVideos(
  mediaType: MediaType,
  id: string
): Promise<VideosResponse> {
  const base = DETAIL_ENDPOINTS[mediaType];
  return tmdbFetch(`${base}/${id}/videos`);
}

export async function getGenres(
  mediaType: MediaType
): Promise<{ genres: Genre[] }> {
  return tmdbFetch(GENRE_ENDPOINTS[mediaType]);
}

export async function searchMedia(
  mediaType: MediaType,
  params: SearchMediaParams
): Promise<TmdbResponse<Media>> {
  const endpoint = SEARCH_ENDPOINTS[mediaType];
  return tmdbFetch(endpoint, {
    query: params.query,
    page: String(params.page || 1),
    ...(params.include_adult !== undefined && { include_adult: String(params.include_adult) }),
  });
}
