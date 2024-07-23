import { useParams } from "react-router-dom";
import BasicMediaDetails from "../components/BasicMediaDetails";
import Recommendations from "../components/Recommendations";
import BackButton from "../components/common/BackButton";
import { MediaType } from "../types/TmdbTypes";
import Videos from "../components/Videos";

const MediaDetailsPage = () => {
  const { id, mediaType } = useParams();
  return (
    <div className="flex flex-col gap-5 p-3">
      <BasicMediaDetails mediaId={id!} mediaType={mediaType as MediaType} />
      <Videos mediaId={id!} mediaType={mediaType as MediaType} />
      <Recommendations mediaId={id!} mediaType={mediaType as MediaType} />
      <BackButton />
    </div>
  );
};

export default MediaDetailsPage;
