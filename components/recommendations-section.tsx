import { Section } from "@pruthvik007/components";
import { MediaCard } from "@/components/media-card";
import type { Media, MediaType } from "@/lib/tmdb/types";

interface RecommendationsSectionProps {
  items: Media[];
  mediaType: MediaType;
}

export function RecommendationsSection({
  items,
  mediaType,
}: RecommendationsSectionProps) {
  if (!items.length) return null;

  return (
    <Section title="Recommendations" className="rounded-xl bg-card p-4">
      <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hidden">
        {items.map((media) => (
          <div key={media.id} className="flex-shrink-0 w-36 md:w-44 overflow-hidden">
            <MediaCard media={media} mediaType={mediaType} />
          </div>
        ))}
      </div>
    </Section>
  );
}
