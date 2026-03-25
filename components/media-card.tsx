"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Badge, Skeleton } from "@pruthvik007/components";
import { cn } from "@pruthvik007/utils";
import { getTmdbImageUrl } from "@/lib/tmdb/images";
import { getMediaTitle, getMediaYear } from "@/lib/tmdb/helpers";
import { WatchlistButton } from "@/components/watchlist-buttons";
import type { Media, MediaType } from "@/lib/tmdb/types";

interface MediaCardProps {
  media: Media;
  mediaType: MediaType;
  className?: string;
  priority?: boolean;
}

export const MediaCard = memo(function MediaCard({
  media,
  mediaType,
  className,
  priority = false,
}: MediaCardProps) {
  const posterUrl = getTmdbImageUrl(
    media.poster_path || media.backdrop_path,
    "poster",
    "lg"
  );
  const title = getMediaTitle(media, mediaType);
  const year = getMediaYear(media, mediaType);

  if (!posterUrl) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="flex items-center justify-center aspect-[2/3] bg-muted">
          <p className="text-muted-foreground text-sm text-center p-2">
            {title}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      href={`/details/${mediaType}/${media.id}`}
      title={`View ${title} ${mediaType === "movies" ? "Movie" : "Show"} Details`}
    >
      <Card
        className={cn(
          "group relative overflow-hidden rounded-lg border-0 transition-transform hover:scale-105",
          className
        )}
      >
        <div className="relative aspect-[2/3]">
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover"
            priority={priority}
          />

          {media.vote_average !== undefined && media.vote_average > 0 && (
            <Badge className="absolute top-2 right-2 text-xs">
              {media.vote_average.toFixed(1)}
            </Badge>
          )}

          <div className="absolute bottom-2 right-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <WatchlistButton media={media} mediaType={mediaType} iconOnly />
          </div>
        </div>

        <CardContent className="p-2">
          <p className="text-sm font-medium text-foreground truncate">
            {title}
          </p>
          {year && (
            <p className="text-xs text-muted-foreground">{year}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
});
