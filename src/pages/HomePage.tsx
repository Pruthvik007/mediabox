import SampleCategoryMedia from "../components/SampleCategoryMedia";
import { END_POINT_OF_MEDIA_OF_CATEGORY } from "../helpers/Constants";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      {Object.keys(END_POINT_OF_MEDIA_OF_CATEGORY.movies).map((key) => (
        <SampleCategoryMedia
          category={key as keyof typeof END_POINT_OF_MEDIA_OF_CATEGORY.movies}
          key={key}
        />
      ))}
    </div>
  );
};

export default HomePage;
