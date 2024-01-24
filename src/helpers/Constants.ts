export const CONSTANTS = {
  MOVIES: "MOVIES",
  SHOWS: "SHOWS",
  PEOPLE: "PEOPLE",
  ALL: "ALL",
  GENRES: "GENRES",
  CATEGORIES: {
    DISCOVER: "DISCOVER",
    POPULAR: "POPULAR",
    TRENDING: "TRENDING",
    NOW_PLAYING: "NOW PLAYING",
    TOP_RATED: "TOP RATED",
    UPCOMING: "UPCOMING",
  },
  ENV: {
    TMDB_API_KEY: import.meta.env.VITE_TMDB_API_KEY,
    BASE_URL: "movies-and-series",
    TMDB_API_BASE_URL: "https://api.themoviedb.org/3/",
    TMDB_API_IMAGE_URL: "https://image.tmdb.org/t/p/",
  },
  YOUTUBE_VIDEO_URL: "https://www.youtube.com/embed/",
  VIDSRC_MOVIE_URL: "https://vidsrc.xyz/embed/movie?tmdb=",
  VIDSRC_SHOW_URL: "https://vidsrc.xyz/embed/show?tmdb=",
};

export type CategoryType =
  | keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.MOVIES
  | keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.SHOWS;

export const END_POINT_OF_MEDIA_OF_CATEGORY = {
  MOVIES: {
    DISCOVER: "discover/movie",
    TRENDING: "trending/movie/week",
    NOW_PLAYING: "movie/now_playing",
    POPULAR: "movie/popular",
    TOP_RATED: "movie/top_rated",
    UPCOMING: "movie/upcoming",
  },
  SHOWS: {
    DISCOVER: "discover/tv",
    TRENDING: "trending/tv/week",
    NOW_PLAYING: "tv/airing_today",
    UPCOMING: "tv/on_the_air",
    POPULAR: "tv/popular",
    TOP_RATED: "tv/top_rated",
  },
};

export const END_POINT_OF = {
  FIND_BY_ID: "find/",

  GENRES_OF_MOVIES: "genre/movie/list",
  GENRES_OF_SHOWS: "genre/tv/list",

  TRENDING_ALL: "trending/all/",
  TRENDING_PEOPLE: "trending/person/",

  ///tv/{SHOWS_id}/similar
  DETAILS_OF_MOVIE: "movie/",
  DETAILS_OF_SHOWS: "tv/",
  SIMILAR: "similar/",

  //?query=
  SEARCH_MOVIE: "search/movie",
  SEARCH_SHOWS: "search/tv",
  SEARCH_PERSON: "search/person",
  SEARCH_ALL: "search/multi",

  MOVIE_CREDITS: "movie/:id/credits",
  SHOW_CREDITS: "tv/:id/credits",

  MOVIE_RECOMENDATIONS: "movie/:id/similar",
  SHOW_RECOMENDATIONS: "tv/:id/similar",

  VIDEOS_OF_MOVIE: "/movie/:id/videos",
  VIDEOS_OF_SHOW: "/tv/:id/videos",
};

export const ID_PLACEHOLDER = ":id";

export const TRENDING_TIME_WINDOW = {
  SIX_HOURS: "6h",
  DAY: "day",
  WEEK: "week",
};
//query page language region year include_adult

export const QUERY_TYPE = {
  SORT_BY: "sort_by",
  SORT_BY_VALUES: {
    POPULARITY_DESC: "popularity.desc",
    POPULARITY_ASC: "popularity.asc",
  },
  PAGE_NUMBER: "page",
  LANGUAGE: "language",
  LANGUAGE_VALUES: {
    ENGLISH: "en",
  },
  REGION: "region",
  YEAR: "year",
  INCLUDE_ADULT: "include_adult",
  QUERY: "query",
  WITH_GENRES: "with_genres",
};

export const ImageSize = {
  POSTER: {
    sm: "w92",
    md: "w185",
    lg: "w500",
    original: "original",
  },
  BACKDROP: {
    sm: "w300",
    md: "w780",
    lg: "w1280",
    original: "original",
  },
};
