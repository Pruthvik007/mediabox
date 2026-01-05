import type { CategoryType, MediaType } from "./types";

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  discover: "Discover",
  popular: "Popular",
  trending: "Trending",
  now_playing: "Now Playing",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

export const CATEGORIES: CategoryType[] = [
  "discover",
  "popular",
  "trending",
  "now_playing",
  "top_rated",
  "upcoming",
];

export const ENDPOINTS: Record<MediaType, Record<CategoryType, string>> = {
  movies: {
    discover: "discover/movie",
    trending: "trending/movie/week",
    now_playing: "movie/now_playing",
    popular: "movie/popular",
    top_rated: "movie/top_rated",
    upcoming: "movie/upcoming",
  },
  shows: {
    discover: "discover/tv",
    trending: "trending/tv/week",
    now_playing: "tv/airing_today",
    upcoming: "tv/on_the_air",
    popular: "tv/popular",
    top_rated: "tv/top_rated",
  },
};

export const DETAIL_ENDPOINTS: Record<MediaType, string> = {
  movies: "movie",
  shows: "tv",
};

export const SEARCH_ENDPOINTS: Record<MediaType, string> = {
  movies: "search/movie",
  shows: "search/tv",
};

export const GENRE_ENDPOINTS: Record<MediaType, string> = {
  movies: "genre/movie/list",
  shows: "genre/tv/list",
};

export const SORT_OPTIONS = [
  { label: "Popularity (High → Low)", value: "popularity.desc" },
  { label: "Popularity (Low → High)", value: "popularity.asc" },
  { label: "Rating (High → Low)", value: "vote_average.desc" },
  { label: "Rating (Low → High)", value: "vote_average.asc" },
  { label: "Votes (High → Low)", value: "vote_count.desc" },
  { label: "Votes (Low → High)", value: "vote_count.asc" },
];

export const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/";
export const YOUTUBE_THUMBNAIL_URL = "https://img.youtube.com/vi/";
export const VIDSRC_MOVIE_URL = "https://vidsrc.xyz/embed/movie?tmdb=";
export const VIDSRC_SHOW_URL = "https://vidsrc.xyz/embed/tv?tmdb=";

export const IMAGE_SIZES = {
  poster: {
    sm: "w92",
    md: "w185",
    lg: "w500",
    original: "original",
  },
  backdrop: {
    sm: "w300",
    md: "w780",
    lg: "w1280",
    original: "original",
  },
  youtubeThumbnail: {
    sm: "hqdefault.jpg",
    md: "mqdefault.jpg",
    lg: "maxresdefault.jpg",
  },
};
