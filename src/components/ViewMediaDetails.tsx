import { MediaDetails, MediaType } from "../types/TmdbTypes";
import BasicMediaDetails from "./BasicMediaDetails";
import Rating from "./common/Rating";
import TmdbImage from "./common/TmdbImage";

const ViewMediaDetails = ({
  mediaType,
  mediaDetails,
}: {
  mediaType: MediaType;
  mediaDetails: MediaDetails;
}) => {
  return (
    <div className="rounded-lg shadow flex flex-col items-center md:flex-row gap-5 text-center md:text-left justify-center p-5 bg-base-100">
      <div className="space-y-5">
        <TmdbImage
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
      {mediaDetails && (
        <BasicMediaDetails mediaDetails={mediaDetails} mediaType={mediaType} />
      )}
    </div>
  );
};

export default ViewMediaDetails;
