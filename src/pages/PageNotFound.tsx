import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-neutral h-screen w-screen">
      <p className="text-xl md:text-2xl lg:text-3xl text font-bold">
        404 - Page Not Found!
      </p>
      <Link
        to={CONSTANTS.ENV.BASE_URL}
        className="btn btn-neutral btn-sm md:btn-md"
      >
        Home
      </Link>
    </div>
  );
};

export default PageNotFound;
