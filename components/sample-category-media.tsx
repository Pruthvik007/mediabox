"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Section } from "@pruthvik007/components";
import { MediaCard } from "@/components/media-card";
import { MediaSelector } from "@/components/media-selector";
import { CATEGORY_LABELS, ENDPOINTS } from "@/lib/tmdb/constants";
import type { Media, MediaType, CategoryType } from "@/lib/tmdb/types";

interface SampleCategoryMediaProps {
  title: string;
  initialItems: Media[];
  category: CategoryType;
  initialMediaType?: MediaType;
}

export function SampleCategoryMedia({
  title,
  initialItems,
  category,
  initialMediaType = "movies",
}: SampleCategoryMediaProps) {
  const [mediaType, setMediaType] = useState<MediaType>(initialMediaType);
  const [items, setItems] = useState<Media[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mediaType === initialMediaType) {
      setItems(initialItems);
      return;
    }

    setIsLoading(true);
    const endpoint = ENDPOINTS[mediaType][category];
    fetch(`/api/tmdb/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setItems(data.results ?? []))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [mediaType, category, initialMediaType, initialItems]);

  const viewMorePath =
    mediaType === "movies"
      ? `/movies/${category}`
      : `/shows/${category}`;

  return (
    <Section className="rounded-xl bg-card p-4">
      <div className="mb-4">
        {/* Small screens: title on top, buttons below */}
        <div className="sm:hidden">
          <h2 className="text-base font-bold text-foreground mb-2">{title}</h2>
          <div className="flex items-center justify-between">
            <MediaSelector selected={mediaType} onSelect={setMediaType} />
            <Link href={viewMorePath}>
              <Button size="xs">View More</Button>
            </Link>
          </div>
        </div>
        {/* Desktop: all in one row */}
        <div className="hidden sm:flex items-center gap-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <MediaSelector selected={mediaType} onSelect={setMediaType} />
          <Link href={viewMorePath} className="ml-auto">
            <Button size="sm">View More</Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hidden">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-36 md:w-44 aspect-[2/3] rounded-lg bg-muted animate-pulse"
              />
            ))
          : items.map((media) => (
              <div key={media.id} className="flex-shrink-0 w-36 md:w-44 overflow-hidden">
                <MediaCard media={media} mediaType={mediaType} />
              </div>
            ))}
      </div>
    </Section>
  );
}
