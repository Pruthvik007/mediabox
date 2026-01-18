"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MediaList } from "@/components/media-list";
import { InfiniteScrollTrigger } from "@/components/infinite-scroll-trigger";
import { AdvancedFilters } from "@/components/advanced-filters";
import { ENDPOINTS } from "@/lib/tmdb/constants";
import type { Media, MediaType, CategoryType } from "@/lib/tmdb/types";

interface Props {
  mediaType: MediaType;
  category: CategoryType;
  initialItems: Media[];
  initialTotalPages: number;
}

export function InfiniteCategoryPage({
  mediaType,
  category,
  initialItems,
  initialTotalPages,
}: Props) {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Media[]>(initialItems);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  // Build query string from URL search params (for filters)
  const filterQuery = searchParams.toString();

  const fetchPage = useCallback(
    async (pageNum: number) => {
      setIsLoading(true);
      try {
        const endpoint = ENDPOINTS[mediaType][category];
        const url = `/api/tmdb/${endpoint}?page=${pageNum}${filterQuery ? `&${filterQuery}` : ""}`;
        const res = await fetch(url);
        const data = await res.json();

        if (pageNum === 1) {
          setItems(data.results);
        } else {
          setItems((prev) => [...prev, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch {
        // Error handled silently
      } finally {
        setIsLoading(false);
      }
    },
    [mediaType, category, filterQuery]
  );

  // Re-fetch when filters change (URL search params)
  useEffect(() => {
    if (filterQuery) {
      setPage(1);
      fetchPage(1);
    }
  }, [filterQuery, fetchPage]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  }, [page, fetchPage]);

  return (
    <div className="flex flex-col gap-6">
      {category === "discover" && (
        <AdvancedFilters mediaType={mediaType} />
      )}

      <MediaList items={items} mediaType={mediaType} isLoading={isLoading && items.length === 0} />

      <InfiniteScrollTrigger
        onLoadMore={loadMore}
        isLoading={isLoading}
        hasMore={page < totalPages}
      />
    </div>
  );
}
