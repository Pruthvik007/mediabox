import { useContext } from "react";
import { MediaType } from "../types/TmdbTypes";
import VideoModalContent from "./VideoModalContent";
import { ModalContext } from "../context/ModalContext";

const MediaProvider = ({
  mediaType,
  id,
}: {
  mediaType: MediaType;
  id: number;
}) => {
  const { openModal } = useContext(ModalContext);
  return (
    <button
      onClick={() =>
        openModal(
          <VideoModalContent
            name="Watch At VidSrc"
            id={id.toString()}
            type="MEDIA"
            mediaType={mediaType}
          />
        )
      }
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      {mediaType === "movies" ? "Watch Movie" : "Watch Show"}
    </button>
  );
};

export default MediaProvider;
