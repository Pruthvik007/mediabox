"use client";

import { ModalHeader, ModalBody } from "@pruthvik007/components";
import {
  YOUTUBE_VIDEO_URL,
  VIDSRC_MOVIE_URL,
  VIDSRC_SHOW_URL,
} from "@/lib/tmdb/constants";
import type { MediaType } from "@/lib/tmdb/types";

interface VideoModalContentProps {
  videoKey?: string;
  title?: string;
  tmdbId?: number;
  mediaType?: MediaType;
  isStream?: boolean;
}

export function VideoModalContent({
  videoKey,
  title,
  tmdbId,
  mediaType = "movies",
  isStream = false,
}: VideoModalContentProps) {
  const src = isStream
    ? `${mediaType === "movies" ? VIDSRC_MOVIE_URL : VIDSRC_SHOW_URL}${tmdbId}`
    : `${YOUTUBE_VIDEO_URL}${videoKey}`;

  const hasSource = isStream ? !!tmdbId : !!videoKey;

  return (
    <>
      {title && (
        <ModalHeader>
          <h3 className="text-sm md:text-xl font-semibold text-foreground">
            {title}
          </h3>
        </ModalHeader>
      )}
      <ModalBody>
        {hasSource ? (
          <iframe
            className="w-full aspect-video rounded-md"
            src={src}
            allowFullScreen
            title={title ?? "Video"}
          />
        ) : (
          <p className="text-xl font-bold text-destructive text-center py-8">
            Video Not Available
          </p>
        )}
      </ModalBody>
    </>
  );
}
