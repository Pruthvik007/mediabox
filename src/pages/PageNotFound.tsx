import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";
import { NotFound } from "../assets/assets";
const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center bg-neutral h-screen w-screen">
      <div className="text-center">
        <img
          src={NotFound}
          alt="Page Not Found"
          className="mx-auto w-1/2 max-w-md"
        />
        <h1 className="mt-5 text-3xl md:text-5xl font-bold text-error">
          Oops!
        </h1>
        <p className="text-xl md:text-2xl text-neutral-100 mt-2">
          We can't seem to find the page you're looking for.
        </p>
        <Link
          to={CONSTANTS.ENV.BASE_URL}
          className="mt-5 inline-block bg-green-300 text-black py-2 px-4 rounded hover:bg-green-900 hover:text-white transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
