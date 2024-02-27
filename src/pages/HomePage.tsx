import SampleCategoryMedia from "../components/SampleCategoryMedia";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <SampleCategoryMedia category="trending" />
      <SampleCategoryMedia category="now_playing" />
      <SampleCategoryMedia category="popular" />
      <SampleCategoryMedia category="top_rated" />
      <SampleCategoryMedia category="upcoming" />
    </div>
  );
};

export default HomePage;
