"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Select, Button } from "@pruthvik007/components";
import { SORT_OPTIONS, GENRE_ENDPOINTS } from "@/lib/tmdb/constants";
import type { Genre, MediaType } from "@/lib/tmdb/types";

interface AdvancedFiltersProps {
  mediaType: MediaType;
  className?: string;
}

export function AdvancedFilters({ mediaType, className }: AdvancedFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<Genre[]>([]);

  const currentGenre = searchParams.get("with_genres") ?? "";
  const currentSort = searchParams.get("sort_by") ?? "";

  useEffect(() => {
    const endpoint = GENRE_ENDPOINTS[mediaType];
    fetch(`/api/tmdb/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres ?? []))
      .catch(() => setGenres([]));
  }, [mediaType]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const genreOptions = genres.map((g) => ({
    label: g.name,
    value: String(g.id),
  }));

  const hasActiveFilters = currentGenre || currentSort;

  return (
    <div
      className={`flex flex-col md:flex-row gap-3 rounded-lg bg-card p-4 items-center ${className ?? ""}`}
    >
      <Select
        options={genreOptions}
        value={currentGenre}
        onChange={(value) => updateParam("with_genres", value)}
        placeholder="All Genres"
      />
      <Select
        options={SORT_OPTIONS}
        value={currentSort}
        onChange={(value) => updateParam("sort_by", value)}
        placeholder="Sort By"
      />
      {hasActiveFilters && (
        <Button variant="destructive" size="sm" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}
