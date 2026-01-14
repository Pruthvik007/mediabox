"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@pruthvik007/components";

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export function InfiniteScrollTrigger({
  onLoadMore,
  isLoading,
  hasMore,
}: InfiniteScrollTriggerProps) {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex justify-center py-8">
      {isLoading && <Spinner size="lg" />}
    </div>
  );
}
