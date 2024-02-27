import { END_POINT_OF_MEDIA_OF_CATEGORY } from "../helpers/Constants";

export interface Response<T = Movie | Show> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  backdrop_path: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Media {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface Show extends Media {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface MediaDetails extends Media {
  adult: boolean;
  genres: Genre[];
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface MovieDetails extends MediaDetails, Movie {
  belongs_to_collection: belongs_to_collection | null;
  budget: number;
  imdb_id: string;
  revenue: number;
  runtime: number;
}

export interface ShowDetails extends MediaDetails, Show {
  created_by: CreatedBy[];
  episode_run_time: number[];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air: null;
  networks: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  type: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface belongs_to_collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface CastAndCrew {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export type MediaType = "movies" | "shows";

export interface QueryParamsType {
  page?: number;
  language?: string;
  region?: string;
}

export interface CategoryMediaParamsType extends QueryParamsType {
  include_adult?: boolean;
  year?: string;
  with_genres?: string;
  sort_by?: string;
}

export interface SearchMediaParamsType extends QueryParamsType {
  query: string;
  include_adult?: boolean;
  year?: string;
}

export interface VideosResponse {
  id: number;
  results: Result[];
}

export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type CategoryType =
  | keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.movies
  | keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.shows;
