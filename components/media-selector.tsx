"use client";

import { Button } from "@pruthvik007/components";
import type { MediaType } from "@/lib/tmdb/types";

interface MediaSelectorProps {
  selected: MediaType;
  onSelect: (type: MediaType) => void;
  className?: string;
}

export function MediaSelector({
  selected,
  onSelect,
  className,
}: MediaSelectorProps) {
  return (
    <div className={`flex gap-2 ${className ?? ""}`}>
      <Button
        variant={selected === "movies" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelect("movies")}
      >
        Movies
      </Button>
      <Button
        variant={selected === "shows" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelect("shows")}
      >
        Shows
      </Button>
    </div>
  );
}
