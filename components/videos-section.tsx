"use client";

import { Section } from "@pruthvik007/components";
import { VideoCard } from "@/components/video-card";
import type { VideoResult } from "@/lib/tmdb/types";

interface VideosSectionProps {
  videos: VideoResult[];
}

export function VideosSection({ videos }: VideosSectionProps) {
  if (!videos.length) return null;

  return (
    <Section title="Videos" className="rounded-xl bg-card p-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hidden">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Section>
  );
}
