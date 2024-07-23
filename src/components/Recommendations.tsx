import { useRecommendations } from "../hooks/TmdbQueries";
import { MediaType } from "../types/TmdbTypes";
import MediaList from "./MediaList";

const Recommendations = ({
  mediaType,
  mediaId,
}: {
  mediaType: MediaType;
  mediaId: string;
}) => {
  const {
    isLoading,
    error,
    data: recommendations,
  } = useRecommendations(mediaType as MediaType, mediaId);
  if (error) return;
  return (
    <div className="bg-neutral rounded-xl p-3">
      <p className="text-3xl font-bold text-white font-sans py-2">
        Recommendations
      </p>
      {error !== null && (
        <p className="text-3xl text-red-500">Something Went Wrong!</p>
      )}
      {recommendations && recommendations.results.length === 0 && (
        <p className="text-3xl text-red-500 text-center">
          No Recommendations Found!
        </p>
      )}
      {recommendations && recommendations.results.length > 0 && (
        <div className="flex gap-3 scrollbar-hidden">
          <MediaList
            mediaList={recommendations.results}
            mediaType={mediaType as MediaType}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Recommendations;
