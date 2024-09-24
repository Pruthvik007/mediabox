import React from "react";
import { saveIcon, savedIcon } from "../assets/assets";
import { useWatchList } from "../hooks/useWatchList";
import { Media, MediaType } from "../types/TmdbTypes";

type WatchlistButtonsProps = {
  mediaDetails: Media;
  mediaType: MediaType;
  asIcons?: boolean;
  className?: string;
  iconsLoading?: "lazy" | "eager";
};

const WatchlistButtons: React.FC<WatchlistButtonsProps> = ({
  mediaDetails: media,
  mediaType,
  asIcons = false,
  className = "",
  iconsLoading = "eager",
}) => {
  const {
    addMediaToWatchList,
    removeMediaFromWatchList,
    isMediaPresentInWatchlist,
  } = useWatchList();

  const handleAddToWatchlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addMediaToWatchList(media, mediaType);
  };

  const handleRemoveFromWatchlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    removeMediaFromWatchList(media, mediaType);
  };

  const renderButton = (isInWatchlist: boolean) => {
    const handleClick = isInWatchlist
      ? handleRemoveFromWatchlist
      : handleAddToWatchlist;
    const buttonClass = isInWatchlist
      ? `bg-red-500 hover:bg-red-700 ${
          asIcons && "btn btn-xs md:btn-sm rounded-full"
        }`
      : `bg-green-500 hover:bg-green-700 ${
          asIcons && "btn btn-xs md:btn-sm rounded-full"
        }`;
    const iconSrc = isInWatchlist ? savedIcon : saveIcon;
    const buttonText = isInWatchlist
      ? "Remove From Watchlist"
      : "Add To Watchlist";

    return (
      <button
        onClick={handleClick}
        className={`${buttonClass} text-white font-bold p-2 rounded-lg ${className}`}
      >
        {asIcons ? (
          <img
            src={iconSrc}
            alt={buttonText}
            className="w-full h-full"
            loading={iconsLoading}
          />
        ) : (
          <span>{buttonText}</span>
        )}
      </button>
    );
  };

  return <>{renderButton(isMediaPresentInWatchlist(media.id, mediaType))}</>;
};

export default WatchlistButtons;
