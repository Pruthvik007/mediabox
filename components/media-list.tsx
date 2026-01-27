"use client";

import { Skeleton } from "@pruthvik007/components";
import { MediaGrid } from "@/components/media-grid";
import { MediaCard } from "@/components/media-card";
import type { Media, MediaType } from "@/lib/tmdb/types";

interface MediaListProps {
  items: Media[];
  mediaType: MediaType;
  isLoading?: boolean;
}

export function MediaList({ items, mediaType, isLoading }: MediaListProps) {
  return (
    <MediaGrid>
      {items.map((media, index) => (
        <MediaCard key={`${media.id}-${index}`} media={media} mediaType={mediaType} />
      ))}
      {isLoading && (
        <Skeleton count={20} className="aspect-[2/3] rounded-lg" />
      )}
    </MediaGrid>
  );
}
