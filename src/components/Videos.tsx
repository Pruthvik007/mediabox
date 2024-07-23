import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { useVideos } from "../hooks/TmdbQueries";
import { MediaType, Result } from "../types/TmdbTypes";
import BackDrop from "./common/BackDrop";
import Image from "./common/Image";
import VideoModalContent from "./VideoModalContent";
import { playIcon } from "../assets/assets";

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
              <div
                className="relative cursor-pointer"
                key={video.key}
                onClick={() => playVideo(video)}
              >
                <Image
                  alt={video.name}
                  imagePath={video.key}
                  imageType="YOUTUBE_THUMBNAIL"
                  loading="lazy"
                  className="card-horizontal-sm md:card-horizontal-md lg:card-horizontal-lg rounded-xl overflow-y-clip"
                />
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10"
                  src={playIcon}
                  alt="play"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;
