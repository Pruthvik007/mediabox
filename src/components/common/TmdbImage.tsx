import { useState } from "react";
import { CONSTANTS, ImageSize } from "../../helpers/Constants";
import Skeleton from "./Skeleton";

const TmdbImage = ({
  imagePath,
  alt,
  imageType = "POSTER",
  loading = "eager",
}: {
  imagePath: string;
  alt: string;
  imageType?: keyof typeof ImageSize;
  loading?: "lazy" | "eager";
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {imagePath ? (
        <img
          src={
            CONSTANTS.ENV.TMDB_API_IMAGE_URL +
            ImageSize[imageType].sm +
            imagePath
          }
          alt={alt}
          style={{
            filter: `${isLoading ? "blur(20px)" : ""}`,
            transition: "1s filter linear",
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          loading={loading}
          height="100%"
          width="100%"
          srcSet={`${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL +
            ImageSize[imageType].sm +
            imagePath
          } 300w, ${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL +
            ImageSize[imageType].md +
            imagePath
          } 768w, ${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL +
            ImageSize[imageType].lg +
            imagePath
          } 1280w`}
          sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
        />
      ) : (
        <div className="relative">
          <Skeleton className="card-sm md:card-md lg:card-lg" />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {alt}
          </p>
        </div>
      )}
    </>
  );
};

export default TmdbImage;
