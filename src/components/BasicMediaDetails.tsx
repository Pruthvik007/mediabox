import { useContext } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../context/ModalContext";
import { CONSTANTS, QUERY_TYPE } from "../helpers/Constants";
import { useMediaDetails, useVideos } from "../hooks/TmdbQueries";
import { useKeyDown } from "../hooks/useKeyDown";
import {
  Genre,
  MediaDetails,
  MediaType,
  MovieDetails,
  ProductionCompany,
  ShowDetails,
} from "../types/TmdbTypes";
import MediaProvider from "./MediaProvider";
import VideoModalContent from "./VideoModalContent";
import WatchlistButtons from "./WatchlistButtons";
import BackDrop from "./common/BackDrop";
import Image from "./common/Image";
import Rating from "./common/Rating";

const BasicMediaDetails = ({
  mediaType,
  mediaId,
}: {
  mediaType: MediaType;
  mediaId: string;
}) => {
  const {
    isLoading,
    error,
    data: mediaDetails,
  } = useMediaDetails(mediaType as MediaType, mediaId!);

  const { openModal } = useContext(ModalContext);
  const videosData = useVideos(mediaType, mediaId);
  const playTrailer = () => {
    let trailer = {
      name: "",
      id: "",
    };

    if (videosData.isSuccess) {
      const trailerData = videosData.data.results
        .sort((v1, v2) => v1.name.localeCompare(v2.name))
        .find(
          (result) =>
            result.official &&
            result.site === "YouTube" &&
            result.type === "Trailer" &&
            result.name.toLowerCase().includes("trailer")
        );
      if (trailerData) {
        trailer = {
          name: trailerData.name,
          id: trailerData.key,
        };
      }
    }
    openModal(<VideoModalContent {...trailer} />);
  };
  useKeyDown(" ", playTrailer);

  return (
    <div>
      {isLoading && <BackDrop />}
      {error !== null && (
        <p className="text-3xl text-red-500">Something Went Wrong!</p>
      )}
      {mediaDetails && (
        <div className="rounded-lg shadow flex flex-col items-center md:flex-row gap-5 text-center md:text-left justify-center p-5 bg-base-100">
          <MediaPosterAndRating mediaDetails={mediaDetails} />
          <div className="flex flex-col gap-3 bg-neutral p-3 rounded-xl w-full md:w-2/3 lg:w-full">
            <MediaTitle mediaDetails={mediaDetails} mediaType={mediaType} />
            {mediaDetails.tagline && mediaDetails.tagline.length > 0 && (
              <p className="text-md md:text-lg italic font-semibold text">
                "{mediaDetails.tagline}"
              </p>
            )}
            <div className="text-lg md:text-xl italic font-semibold text">
              <p>{mediaDetails.overview}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-center items-center md:justify-start">
              <div className="flex gap-3">
                <button onClick={playTrailer} className="custom-btn-primary">
                  Watch Trailer
                </button>
                <MediaProvider mediaType={mediaType} id={mediaDetails.id} />
              </div>
              <WatchlistButtons
                mediaDetails={mediaDetails}
                mediaType={mediaType}
              />
            </div>
            <GenresOrCompanies
              mediaType={mediaType}
              data={mediaDetails.genres}
              type="Genres"
            />
            <GenresOrCompanies
              data={mediaDetails.production_companies}
              type="Production Companies"
              mediaType={mediaType}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicMediaDetails;

const MediaTitle = ({
  mediaDetails,
  mediaType,
}: {
  mediaDetails: MediaDetails;
  mediaType: MediaType;
}) => {
  const title =
    mediaType === "movies"
      ? (mediaDetails as MovieDetails).original_title
      : (mediaDetails as ShowDetails).original_name;
  const date =
    mediaType === "movies"
      ? (mediaDetails as MovieDetails).release_date
      : (mediaDetails as ShowDetails).first_air_date;

  return (
    <p className="text-3xl text-white">
      {title} ({date.split("-")[0]})
    </p>
  );
};

const GenresOrCompanies = ({
  data,
  type,
  mediaType,
}: {
  data: (Genre | ProductionCompany)[];
  type: "Genres" | "Production Companies";
  mediaType: MediaType;
}) => {
  const typeKey =
    type === "Genres" ? QUERY_TYPE.WITH_GENRES : QUERY_TYPE.WITH_COMPANIES;
  return (
    <div className="flex flex-col items-center md:flex-row bg-base-100 rounded-xl py-2 px-4 gap-x-2">
      <p className="text-lg text whitespace-nowrap">{type}</p>
      <div
        className="flex rounded-md shadow-sm gap-2 p-2 overflow-x-auto max-w-full"
        role="group"
      >
        {data.map((item) => (
          <Link
            to={`${CONSTANTS.ENV.BASE_URL}media/${mediaType}/discover?${typeKey}=${item.id}`}
            key={item.id}
            type="button"
            className="btn btn-sm md:btn-md btn-active btn-info"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MediaPosterAndRating = ({
  mediaDetails,
}: {
  mediaDetails: MediaDetails;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-5">
      <Image
        imagePath={mediaDetails?.poster_path}
        alt={mediaDetails?.id.toString()}
        loading="eager"
        className="card-lg"
      />
      <Rating
        actualRating={Number((mediaDetails.vote_average / 2).toFixed(1))}
        totalRating={5}
        displayText={`${mediaDetails.vote_average.toFixed(1)} / 10`}
      />
    </div>
  );
};
