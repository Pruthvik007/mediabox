import { useParams } from "react-router-dom";
import MediaList from "../components/MediaList";
import ViewMediaDetails from "../components/ViewMediaDetails";
import BackButton from "../components/common/BackButton";
import BackDrop from "../components/common/BackDrop";
import { useMediaDetails, useRecommendations } from "../hooks/TmdbQueries";
import { MediaType } from "../types/TmdbTypes";
import ErrorPage from "./ErrorPage";
import { CONSTANTS } from "../helpers/Constants";

const MediaDetailsPage = () => {
  const { id, mediaType } = useParams();

  const {
    isLoading,
    error,
    data: mediaDetails,
  } = useMediaDetails(mediaType as MediaType, id!);

  const recommendationsData = useRecommendations(mediaType as MediaType, id!);

  if (isLoading) return <BackDrop />;
  if (error) return <ErrorPage />;
  return (
    <div className="flex flex-col gap-5 p-3">
      {mediaDetails && (
        <ViewMediaDetails
          mediaDetails={mediaDetails}
          mediaType={mediaType as MediaType}
        />
      )}
      {recommendationsData.data?.results?.length !== undefined &&
        recommendationsData.data?.results?.length > 0 && (
          <div className="bg-neutral rounded-xl p-3">
            <p className="text-3xl font-bold text-white font-sans py-2">
              Recommendations
            </p>
            <div className="flex flex-row gap-3 scrollbar-hidden">
              <MediaList
                mediaList={recommendationsData.data?.results}
                mediaType={mediaType as MediaType}
                isLoading={recommendationsData.isLoading}
              />
            </div>
          </div>
        )}
      <BackButton to={`/${CONSTANTS.ENV.BASE_URL}`} />
    </div>
  );
};

export default MediaDetailsPage;
