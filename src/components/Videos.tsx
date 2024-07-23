import { useContext } from "react";
import { useVideos } from "../hooks/TmdbQueries";
import { MediaType, Result } from "../types/TmdbTypes";
import BackDrop from "./common/BackDrop";
import { ModalContext } from "../context/ModalContext";
import VideoModalContent from "./VideoModalContent";
import { CONSTANTS } from "../helpers/Constants";

const Videos = ({
  mediaType,
  mediaId,
}: {
  mediaType: MediaType;
  mediaId: string;
}) => {
  const { openModal } = useContext(ModalContext);
  const { isLoading, error, data: videos } = useVideos(mediaType, mediaId);

  const playVideo = (video: Result) => {
    const metaData = {
      name: video.name,
      id: video.key,
    };
    openModal(<VideoModalContent {...metaData} />);
  };

  return (
    <div className="bg-neutral rounded-xl p-3 shadow">
      <p className="text-3xl font-bold text-white font-sans py-4">Videos</p>
      {isLoading && <BackDrop />}
      {error !== null && (
        <p className="text-3xl text-red-500">Something Went Wrong!</p>
      )}
      {videos && videos.results.length === 0 && (
        <p className="text-3xl text-red-500 text-center">No Videos Found!</p>
      )}
      {videos && (
        <div className="flex gap-3 overflow-x-auto">
          {videos.results.map((video) => {
            return (
              <div key={video.key} onClick={() => playVideo(video)}>
                <iframe
                  className="pointer-events-none"
                  src={CONSTANTS.YOUTUBE_VIDEO_URL + video.key}
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;
