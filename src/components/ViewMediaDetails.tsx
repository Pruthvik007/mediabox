import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { CONSTANTS, posterSize } from "../helpers/Constants";
import { useVideos } from "../hooks/TmdbQueries";
import {
  Genre,
  MediaDetails,
  MediaType,
  MovieDetails,
  ShowDetails,
} from "../types/TmdbTypes";
import Modal from "./common/Modal";
import Rating from "./common/Rating";
const Genres = ({ genres }: { genres: Genre[] }) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-center gap-3 bg-base-100 p-3 rounded-xl">
      <p className="text-xl font-bold text-white">Genres:</p>
      <div
        id="genres"
        className="inline-flex justify-center md:justify-start rounded-md shadow-sm gap-2 bg-base-100"
        role="group"
      >
        {genres.map((genre) => (
          <button
            disabled
            key={genre.id}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductionCompanies = ({
  mediaDetails,
}: {
  mediaDetails: MediaDetails;
}) => {
  return (
    <div
      id="production_companies"
      className="flex flex-col items-center md:flex-row md:items-center gap-3 bg-base-100 p-3 rounded-xl overflow-x-auto"
    >
      <p className="text-xl font-bold text-white">Production Companies:</p>
      <div
        className="justify-center md:justify-start rounded-md shadow-sm flex flex-row gap-3"
        role="group"
      >
        {mediaDetails.production_companies.map((company) => (
          <button
            disabled
            key={company.id}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const MediaTitle = ({
  mediaDetails,
  mediaType,
}: {
  mediaDetails: MediaDetails;
  mediaType: MediaType;
}) => {
  return (
    <>
      {mediaType === "MOVIES" ? (
        <p className="text-3xl text-white">
          {(mediaDetails as MovieDetails).original_title} (
          {(mediaDetails as MovieDetails).release_date.split("-")[0]})
        </p>
      ) : (
        <p className="text-3xl text-white">
          {(mediaDetails as ShowDetails).original_name} (
          {(mediaDetails as ShowDetails).first_air_date.split("-")[0]})
        </p>
      )}
    </>
  );
};

const VideoModalContent = ({
  name,
  id,
  type = "VIDEO",
}: {
  name: string;
  id: string;
  type?: "VIDEO" | "MEDIA";
}) => {
  return (
    <div>
      <Modal.Header>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
      </Modal.Header>
      <Modal.Body>
        {id.length > 0 && (
          <iframe
            className="w-full h-80"
            src={
              (type === "VIDEO"
                ? CONSTANTS.YOUTUBE_VIDEO_URL
                : CONSTANTS.VIDSRC_URL) + id
            }
            allowFullScreen
          ></iframe>
        )}
        {id.length === 0 && (
          <p className="text-xl font-bold text-red-500 text-center">
            Video Not Available
          </p>
        )}
      </Modal.Body>
    </div>
  );
};

const BasicDetails = ({
  mediaType,
  mediaDetails,
}: {
  mediaType: MediaType;
  mediaDetails: MediaDetails;
}) => {
  const { openModal } = useContext(ModalContext);
  const videosData = useVideos(mediaType, mediaDetails.id.toString());
  let trailer = {
    name: "",
    id: "",
  };
  if (videosData.isSuccess) {
    const trailerData = videosData.data.results.filter(
      (result) =>
        result.official &&
        result.site === "YouTube" &&
        result.type === "Trailer"
    )[0];
    trailer = {
      name: trailerData ? trailerData.name : "",
      id: trailerData ? trailerData.key : "",
    };
  }
  return (
    <div className="flex flex-col gap-3 bg-neutral p-3 rounded-xl max-w-full">
      <MediaTitle
        mediaDetails={mediaDetails}
        mediaType={mediaType as MediaType}
      />
      {mediaDetails.tagline !== undefined &&
        mediaDetails.tagline.length > 0 && (
          <p className="text-xl italic font-semibold text-gray-900 dark:text-white">
            "{mediaDetails.tagline}"
          </p>
        )}
      <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
        <p>{mediaDetails.overview}</p>
      </blockquote>
      <div className="flex flex-row gap-3 justify-center md:justify-start">
        <button
          onClick={() => openModal(<VideoModalContent {...trailer} />)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Play Trailer
        </button>
        {mediaType === "MOVIES" && (
          <button
            onClick={() =>
              openModal(
                <VideoModalContent
                  name="Watch At VidSrc"
                  id={mediaDetails.id.toString()}
                  type="MEDIA"
                />
              )
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Watch Movie
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Genres genres={mediaDetails.genres} />
        <ProductionCompanies mediaDetails={mediaDetails} />
      </div>
    </div>
  );
};

const ViewMediaDetails = ({
  mediaType,
  mediaDetails,
}: {
  mediaType: MediaType;
  mediaDetails: MediaDetails;
}) => {
  return (
    <div className="rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center md:flex-row md:items-start gap-5 text-center md:text-left p-3">
      <div className="flex flex-col items-center">
        <div className="card-lg">
          <img
            className="rounded-xl"
            src={
              CONSTANTS.ENV.TMDB_API_IMAGE_URL +
              posterSize.original +
              mediaDetails?.poster_path
            }
          />
        </div>
        <div className="flex flex-row justify-center">
          <Rating
            actualRating={Number((mediaDetails.vote_average / 2).toFixed(1))}
            totalRating={5}
            displayText
          />
        </div>
      </div>
      {mediaDetails && (
        <BasicDetails mediaDetails={mediaDetails} mediaType={mediaType} />
      )}
    </div>
  );
};

export default ViewMediaDetails;
