import { useContext } from "react";
import { MediaType } from "../types/TmdbTypes";
import VideoModalContent from "./VideoModalContent";
import { ModalContext } from "../context/ModalContext";
import { useKeyDown } from "../hooks/useKeyDown";

const MediaProvider = ({
  mediaType,
  id,
}: {
  mediaType: MediaType;
  id: number;
}) => {
  const { openModal } = useContext(ModalContext);
  const playMedia = () => {
    openModal(
      <VideoModalContent
        name="Watch At VidSrc"
        id={id.toString()}
        type="MEDIA"
        mediaType={mediaType}
      />
    );
  };
  useKeyDown("Enter", playMedia);
  return (
    <button onClick={playMedia} className="custom-btn-primary">
      {mediaType === "movies" ? "Watch Movie" : "Watch Show"}
    </button>
  );
};

export default MediaProvider;
