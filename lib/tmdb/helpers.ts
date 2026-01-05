import type {
  CategoryMediaParams,
  Media,
  MediaType,
  Movie,
  Show,
  VideosResponse,
} from "./types";

export function buildCategoryParams(params: CategoryMediaParams): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== "") {
      result[key] = String(value);
    }
  }
  return result;
}

export function getOfficialTrailer(videos: VideosResponse | undefined) {
  const trailer = videos?.results
    .sort((a, b) => a.name.localeCompare(b.name))
    .find(
      (r) =>
        r.official &&
        r.site === "YouTube" &&
        r.type === "Trailer" &&
        r.name.toLowerCase().includes("trailer")
    );
  return trailer ? { name: trailer.name, key: trailer.key } : null;
}

export function getMediaTitle(media: Media, mediaType: MediaType): string {
  return mediaType === "movies"
    ? (media as Movie).title || (media as Movie).original_title
    : (media as Show).name || (media as Show).original_name;
}

export function getMediaYear(media: Media, mediaType: MediaType): string {
  const date =
    mediaType === "movies"
      ? (media as Movie).release_date
      : (media as Show).first_air_date;
  return date ? date.substring(0, 4) : "";
}
