"use client";

import { Heart } from "lucide-react";
import { Button } from "@pruthvik007/components";
import { cn } from "@pruthvik007/utils";
import { useWatchlist } from "@/hooks/use-watchlist";
import type { Media, MediaType } from "@/lib/tmdb/types";

interface WatchlistButtonProps {
  media: Media;
  mediaType: MediaType;
  iconOnly?: boolean;
  className?: string;
}

export function WatchlistButton({
  media,
  mediaType,
  iconOnly = false,
  className,
}: WatchlistButtonProps) {
  const { addMedia, removeMedia, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(media.id, mediaType);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeMedia(media, mediaType);
    } else {
      addMedia(media, mediaType);
    }
  };

  if (iconOnly) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleClick}
        className={cn(
          "rounded-full bg-background/80 hover:bg-background",
          className
        )}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        <Heart
          className={cn(
            "h-4 w-4",
            inWatchlist
              ? "fill-red-500 text-red-500"
              : "text-muted-foreground"
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={inWatchlist ? "destructive" : "default"}
      onClick={handleClick}
      className={className}
    >
      <Heart
        className={cn(
          "mr-2 h-4 w-4",
          inWatchlist && "fill-current"
        )}
      />
      {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </Button>
  );
}
