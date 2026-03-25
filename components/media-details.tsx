"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Badge, Rating, ModalHeader, ModalBody } from "@pruthvik007/components";
import { cn } from "@pruthvik007/utils";
import { Play, Tv } from "lucide-react";
import { getTmdbImageUrl } from "@/lib/tmdb/images";
import { getMediaTitle, getMediaYear } from "@/lib/tmdb/helpers";
import { WatchlistButton } from "@/components/watchlist-buttons";
import { VideoModalContent } from "@/components/video-modal-content";
import { useModal } from "@/hooks/use-modal";
import type {
  MediaType,
  MovieDetails,
  ShowDetails,
  Genre,
  ProductionCompany,
} from "@/lib/tmdb/types";

interface MediaDetailsProps {
  details: MovieDetails | ShowDetails;
  mediaType: MediaType;
  trailer: { name: string; key: string } | null;
}

export function MediaDetails({
  details,
  mediaType,
  trailer,
}: MediaDetailsProps) {
  const { openModal } = useModal();
  const title = getMediaTitle(details, mediaType);
  const year = getMediaYear(details, mediaType);
  const posterUrl = getTmdbImageUrl(details.poster_path, "poster", "lg");
  const backdropUrl = getTmdbImageUrl(details.backdrop_path, "backdrop", "lg");

  const handlePlayTrailer = () => {
    if (!trailer) return;
    openModal(
      <VideoModalContent videoKey={trailer.key} title={trailer.name} />
    );
  };

  const handleWatchStream = () => {
    openModal(
      <VideoModalContent
        tmdbId={details.id}
        mediaType={mediaType}
        isStream
        title={mediaType === "movies" ? "Watch Movie" : "Watch Show"}
      />
    );
  };

  return (
    <div className="relative">
      {backdropUrl && (
        <div className="absolute inset-0 h-96 overflow-hidden">
          <Image
            src={backdropUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
      )}

      <div className="relative flex flex-col md:flex-row gap-6 p-6 pt-12 items-center md:items-start">
        {posterUrl && (
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div className="relative w-40 min-[400px]:w-52 sm:w-56 md:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={posterUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {details.vote_average !== undefined && (
              <Rating
                value={Math.ceil(details.vote_average / 2)}
                max={5}
              />
            )}
            {details.vote_average !== undefined && (
              <p className="text-sm text-muted-foreground">
                {details.vote_average.toFixed(1)} / 10
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 rounded-xl bg-card p-5 w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {title} {year && <span className="text-muted-foreground">({year})</span>}
          </h1>

          {details.tagline && (
            <p className="text-md md:text-lg italic text-muted-foreground">
              &ldquo;{details.tagline}&rdquo;
            </p>
          )}

          <p className="text-base md:text-lg text-foreground leading-relaxed">
            {details.overview}
          </p>

          <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
            <div className="flex gap-3">
              {trailer && (
                <Button onClick={handlePlayTrailer}>
                  <Play className="mr-2 h-4 w-4" />
                  Watch Trailer
                </Button>
              )}
              <Button variant="secondary" onClick={handleWatchStream}>
                <Tv className="mr-2 h-4 w-4" />
                {mediaType === "movies" ? "Watch Movie" : "Watch Show"}
              </Button>
            </div>
            <WatchlistButton media={details} mediaType={mediaType} />
          </div>

          <GenreList genres={details.genres} mediaType={mediaType} />

          {details.production_companies.length > 0 && (
            <div className="flex flex-col md:flex-row items-center gap-2 rounded-lg bg-background p-3">
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Production Companies
              </p>
              <div className="flex gap-2 flex-wrap">
                {details.production_companies.map((company) => (
                  <Badge key={company.id} variant="outline">
                    {company.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenreList({
  genres,
  mediaType,
}: {
  genres: Genre[];
  mediaType: MediaType;
}) {
  if (!genres.length) return null;

  const basePath = mediaType === "movies" ? "/movies/discover" : "/shows/discover";

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 rounded-lg bg-background p-3">
      <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Genres
      </p>
      <div className="flex gap-2 flex-wrap">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`${basePath}?with_genres=${genre.id}`}
          >
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {genre.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
