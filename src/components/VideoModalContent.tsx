import { CONSTANTS } from "../helpers/Constants";
import { MediaType } from "../types/TmdbTypes";
import Modal from "./common/Modal";

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
  const src =
    (type === "VIDEO"
      ? CONSTANTS.YOUTUBE_VIDEO_URL
      : mediaType === "movies"
      ? CONSTANTS.VIDSRC_MOVIE_URL
      : CONSTANTS.VIDSRC_SHOW_URL) + id;
  return (
    <div>
      <Modal.Header>
        <h3 className="text-xl font-semibold text">{name}</h3>
      </Modal.Header>
      <Modal.Body>
        {id.length > 0 && (
          <iframe className="w-full h-80" src={src} allowFullScreen></iframe>
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

export default VideoModalContent;
