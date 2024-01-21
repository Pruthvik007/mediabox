import { useState } from "react";
import { CONSTANTS, posterSize } from "../../helpers/Constants";
import Skeleton from "./Skeleton";

const TmdbImage = ({
  imagePath,
  alt,
  className = "",
}: {
  imagePath: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      className={`card-sm md:card-md lg:card-lg overflow-y-clip ${className}`}
    >
      {imagePath ? (
        <img
          src={CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.lg + imagePath}
          alt={alt}
          style={{
            filter: `${isLoading ? "blur(20px)" : ""}`,
            transition: "1s filter linear",
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          loading="lazy"
          height="100%"
          width="100%"
          srcSet={`${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.sm + imagePath
          } 300w, ${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.md + imagePath
          } 768w, ${
            CONSTANTS.ENV.TMDB_API_IMAGE_URL + posterSize.lg + imagePath
          } 1280w`}
          sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, 1280px"
        />
      ) : (
        <div className="relative">
          <Skeleton />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
};

export default TmdbImage;
