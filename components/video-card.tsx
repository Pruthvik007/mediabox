"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { getYoutubeThumbnailUrl } from "@/lib/tmdb/images";
import { VideoModalContent } from "@/components/video-modal-content";
import type { VideoResult } from "@/lib/tmdb/types";

interface VideoCardProps {
  video: VideoResult;
}

export function VideoCard({ video }: VideoCardProps) {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(
      <VideoModalContent videoKey={video.key} title={video.name} />
    );
  };

  const thumbnailUrl = getYoutubeThumbnailUrl(video.key, "md");

  return (
    <button
      onClick={handleClick}
      className="relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden group"
    >
      <Image
        src={thumbnailUrl}
        alt={video.name}
        width={320}
        height={180}
        className="object-cover rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
        <Play className="h-8 w-8 md:h-10 md:w-10 text-white fill-white/80" />
      </div>
    </button>
  );
}
