"use client";

import { useState } from "react";
import { Container } from "@pruthvik007/components";
import { MediaSelector } from "@/components/media-selector";
import { MediaList } from "@/components/media-list";
import { useWatchlist } from "@/hooks/use-watchlist";
import type { MediaType } from "@/lib/tmdb/types";

export default function WatchlistPage() {
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const { watchList } = useWatchlist();

  const items = watchList[mediaType];

  return (
    <Container size="lg">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Watchlist</h1>
          <MediaSelector selected={mediaType} onSelect={setMediaType} />
        </div>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Your {mediaType === "movies" ? "movie" : "TV show"} watchlist is empty. Browse and add some!
          </p>
        ) : (
          <MediaList items={items} mediaType={mediaType} />
        )}
      </div>
    </Container>
  );
}
