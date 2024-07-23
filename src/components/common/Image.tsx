import { useState } from "react";
import { CONSTANTS, ImageSize } from "../../helpers/Constants";
import Skeleton from "./Skeleton";

const Image = ({
  imagePath,
  alt,
  imageType = "POSTER",
  loading = "eager",
  className = "",
}: {
  imagePath: string;
  alt: string;
  imageType?: keyof typeof ImageSize;
  loading?: "lazy" | "eager";
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const getImage = (size: "sm" | "md" | "lg" = "sm") => {
    return imageType === "YOUTUBE_THUMBNAIL"
      ? getYoutubeImage(size)
      : getTmdbImage(size);
  };
  const getTmdbImage = (size: "sm" | "md" | "lg" = "sm") => {
    return (
      CONSTANTS.ENV.TMDB_API_IMAGE_URL + ImageSize[imageType][size] + imagePath
    );
  };

  const getYoutubeImage = (size: "sm" | "md" | "lg" = "sm") => {
    return (
      CONSTANTS.YOUTUBE_THUMBNAIL_URL +
      imagePath +
      "/" +
      ImageSize[imageType][size]
    );
  };
  return (
    <>
      {imagePath ? (
        <div className={className}>
          <img
            src={getImage()}
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
            srcSet={`${getImage("sm")} 300w, ${getImage("md")} 768w, ${getImage(
              "lg"
            )} 1280w`}
            sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
          />
        </div>
      ) : (
        <div className="relative">
          <Skeleton className={className} />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {alt}
          </p>
        </div>
      )}
    </>
  );
};

export default Image;
