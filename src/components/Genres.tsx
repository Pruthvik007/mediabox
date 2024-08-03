import { memo } from "react";
import { useGenres } from "../hooks/TmdbQueries";
import { MediaType } from "../types/TmdbTypes";
import Dropdown from "./common/Dropdown";

const Genres = memo(
  ({
    mediaType,
    value,
    onChange,
  }: {
    mediaType: MediaType;
    value: string;
    onChange: (value: string) => void;
  }) => {
    const genres = useGenres(mediaType);
    const options = genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    }));
    return (
      <Dropdown
        label="Genres"
        options={options}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default Genres;
