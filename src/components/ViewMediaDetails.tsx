import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { CONSTANTS } from "../helpers/Constants";
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
import TmdbImage from "./common/TmdbImage";
const Genres = ({ genres }: { genres: Genre[] }) => {
  return (
    <div
      id="genres"
      className="flex flex-col items-center md:flex-row bg-base-100 rounded-xl p-3 gap-x-2 overflow-x-auto"
    >
      <p className="text-xl font-bold text-white">Genres:</p>
      <div className="max-w-full overflow-x-auto">
        <div
          className="flex flex-row justify-start rounded-md shadow-sm gap-2 p-2"
          role="group"
        >
          {genres.map((genre) => (
            <button
              disabled
              key={genre.id}
              type="button"
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              {genre.name}
            </button>
          ))}
        </div>
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
      className="flex flex-col items-center md:flex-row bg-base-100 rounded-xl p-3 gap-x-2 overflow-x-auto"
    >
      <p className="text-xl font-bold text-white">Production Companies:</p>
      <div className="max-w-full overflow-x-auto">
        <div
          className="flex flex-row justify-start rounded-md shadow-sm gap-2 p-2"
          role="group"
        >
          {mediaDetails.production_companies.map((company) => (
            <button
              disabled
              key={company.id}
              type="button"
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              {company.name}
            </button>
          ))}
        </div>
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
      {mediaType.toUpperCase() === "MOVIES" ? (
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
  mediaType,
}: {
  name: string;
  id: string;
  type?: "VIDEO" | "MEDIA";
  mediaType?: MediaType;
}) => {
  return (
    <div>
      <Modal.Header>
        <h3 className="text-xl font-semibold text">{name}</h3>
      </Modal.Header>
      <Modal.Body>
        {id.length > 0 && (
          <iframe
            className="w-full h-80"
            src={
              (type === "VIDEO"
                ? CONSTANTS.YOUTUBE_VIDEO_URL
                : mediaType === "MOVIES"
                ? CONSTANTS.VIDSRC_MOVIE_URL
                : CONSTANTS.VIDSRC_SHOW_URL) + id
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
        result.type === "Trailer" &&
        result.name === "Official Trailer"
    )[0];
    trailer = {
      name: trailerData ? trailerData.name : "",
      id: trailerData ? trailerData.key : "",
    };
  }
  const WatchMedia = () => {
    return (
      <button
        onClick={() =>
          openModal(
            <VideoModalContent
              name="Watch At VidSrc"
              id={mediaDetails.id.toString()}
              type="MEDIA"
              mediaType={mediaType}
            />
          )
        }
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        {mediaType === "MOVIES" ? "Watch Movie" : "Watch Show"}
      </button>
    );
  };
  return (
    <div className="flex flex-col gap-3 bg-neutral p-3 rounded-xl max-w-full">
      <MediaTitle
        mediaDetails={mediaDetails}
        mediaType={mediaType as MediaType}
      />
      {mediaDetails.tagline !== undefined &&
        mediaDetails.tagline.length > 0 && (
          <p className="text-md md:text-lg italic font-semibold text">
            "{mediaDetails.tagline}"
          </p>
        )}
      <div className="text-lg md:text-xl italic font-semibold text">
        <p>{mediaDetails.overview}</p>
      </div>
      <div className="flex flex-row gap-3 justify-center md:justify-start">
        <button
          onClick={() => openModal(<VideoModalContent {...trailer} />)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Play Trailer
        </button>
        <WatchMedia />
      </div>
      <div className="flex flex-col gap-3 lg:flex-row max-w-6xl">
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
    <div className="rounded-lg shadow flex flex-col items-center md:flex-row gap-5 text-center md:text-left justify-center p-5 bg-base-100">
      <div className="flex flex-col">
        <div className="card-lg">
          <TmdbImage
            imagePath={mediaDetails?.poster_path}
            alt={mediaDetails?.id.toString()}
          />
        </div>
        <Rating
          actualRating={Number((mediaDetails.vote_average / 2).toFixed(1))}
          totalRating={5}
          displayText={`${mediaDetails.vote_average.toFixed(1)} / 10`}
        />
      </div>
      {mediaDetails && (
        <BasicDetails mediaDetails={mediaDetails} mediaType={mediaType} />
      )}
    </div>
  );
};

export default ViewMediaDetails;
