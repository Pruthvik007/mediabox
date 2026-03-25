export const revalidate = 86400;

import { Container } from "@pruthvik007/components";
import { getMediaDetails, getVideos, getRecommendations } from "@/lib/tmdb/api";
import { getOfficialTrailer } from "@/lib/tmdb/helpers";
import { MediaDetails } from "@/components/media-details";
import { VideosSection } from "@/components/videos-section";
import { RecommendationsSection } from "@/components/recommendations-section";
import { notFound } from "next/navigation";
import type { MediaType } from "@/lib/tmdb/types";

interface Props {
  params: Promise<{ type: string; id: string }>;
}

export default async function DetailsPage({ params }: Props) {
  const { type, id } = await params;

  if (type !== "movies" && type !== "shows") {
    notFound();
  }

  const mediaType = type as MediaType;

  const [details, videos, recommendations] = await Promise.all([
    getMediaDetails(mediaType, id),
    getVideos(mediaType, id),
    getRecommendations(mediaType, id),
  ]);

  const trailer = getOfficialTrailer(videos);

  return (
    <Container size="lg">
      <div className="flex flex-col gap-8">
        <MediaDetails details={details} mediaType={mediaType} trailer={trailer} />

        {videos.results.length > 0 && (
          <VideosSection videos={videos.results} />
        )}

        {recommendations.results.length > 0 && (
          <RecommendationsSection items={recommendations.results} mediaType={mediaType} />
        )}
      </div>
    </Container>
  );
}
