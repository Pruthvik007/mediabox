import { CONSTANTS } from "../helpers/Constants";
import { MediaType } from "../types/TmdbTypes";
import Modal from "./common/Modal";

const VideoModalContent = ({
  name,
  id,
  type = "VIDEO",
  mediaType = "movies",
}: {
  name: string | undefined;
  id: string | undefined;
  type?: "VIDEO" | "MEDIA";
  mediaType?: MediaType;
}) => {
  const src =
    (type === "VIDEO"
      ? CONSTANTS.YOUTUBE_VIDEO_URL
      : mediaType === "movies"
      ? CONSTANTS.VIDSRC_MOVIE_URL
      : CONSTANTS.VIDSRC_SHOW_URL) + id;
  return (
    <>
      {name && (
        <Modal.Header>
          <h3 className="text-sm md:text-xl font-semibold">{name}</h3>
        </Modal.Header>
      )}
      <Modal.Body>
        {id && (
          <iframe
            className="w-full h-48 sm:h-80"
            src={src}
            allowFullScreen
          ></iframe>
        )}
        {!id && (
          <p className="text-xl font-bold text-red-500 text-center">
            Video Not Available
          </p>
        )}
      </Modal.Body>
    </>
  );
};

export default VideoModalContent;
