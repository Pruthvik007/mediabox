import { IMAGE_SIZES, YOUTUBE_THUMBNAIL_URL } from "./constants";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

type ImageType = "poster" | "backdrop";
type ImageSize = "sm" | "md" | "lg" | "original";
type YoutubeThumbnailSize = "sm" | "md" | "lg";

export function getTmdbImageUrl(
  path: string | null,
  type: ImageType = "poster",
  size: ImageSize = "md"
): string | null {
  if (!path) return null;
  const sizeValue = IMAGE_SIZES[type][size];
  return `${TMDB_IMAGE_BASE}${sizeValue}${path}`;
}

export function getYoutubeThumbnailUrl(
  videoKey: string,
  size: YoutubeThumbnailSize = "md"
): string {
  return `${YOUTUBE_THUMBNAIL_URL}${videoKey}/${IMAGE_SIZES.youtubeThumbnail[size]}`;
}
