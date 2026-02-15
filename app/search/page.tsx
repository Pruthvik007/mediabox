"use client";

import { useState, useEffect, useCallback } from "react";
import { Container, Spinner } from "@pruthvik007/components";
import { useDebounce } from "@pruthvik007/components";
import { SearchInput } from "@/components/search-input";
import { MediaSelector } from "@/components/media-selector";
import { MediaList } from "@/components/media-list";
import { InfiniteScrollTrigger } from "@/components/infinite-scroll-trigger";
import type { Media, MediaType } from "@/lib/tmdb/types";
import { SEARCH_ENDPOINTS } from "@/lib/tmdb/constants";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const [items, setItems] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 700);

  const fetchResults = useCallback(async (searchQuery: string, type: MediaType, pageNum: number) => {
    if (!searchQuery.trim()) {
      setItems([]);
      setTotalPages(0);
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = SEARCH_ENDPOINTS[type];
      const res = await fetch(`/api/tmdb/${endpoint}?query=${encodeURIComponent(searchQuery)}&page=${pageNum}`);
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
  }, []);

  useEffect(() => {
    setPage(1);
    fetchResults(debouncedQuery, mediaType, 1);
  }, [debouncedQuery, mediaType, fetchResults]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(debouncedQuery, mediaType, nextPage);
  }, [page, debouncedQuery, mediaType, fetchResults]);

  return (
    <Container size="lg">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-center">
          <div className="w-full sm:w-80">
            <SearchInput value={query} onChange={setQuery} />
          </div>
          <MediaSelector selected={mediaType} onSelect={(t) => { setMediaType(t); setPage(1); }} />
        </div>

        {isLoading && items.length === 0 ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : items.length === 0 && debouncedQuery ? (
          <p className="text-center text-muted-foreground py-12">No results found for &quot;{debouncedQuery}&quot;</p>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Search for movies or TV shows</p>
        ) : (
          <>
            <MediaList items={items} mediaType={mediaType} />
            <InfiniteScrollTrigger
              onLoadMore={loadMore}
              isLoading={isLoading}
              hasMore={page < totalPages}
            />
          </>
        )}
      </div>
    </Container>
  );
}
