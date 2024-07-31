import { Link } from "react-router-dom";
import { CONSTANTS } from "../helpers/Constants";

const ErrorPage = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center min-height-screen">
      <p className="text-3xl text-red-500">
        {message || "Something Went Wrong!"}
      </p>
      <Link
        to={CONSTANTS.ENV.BASE_URL}
        className="mt-5 inline-block bg-green-300 text-black py-2 px-4 rounded hover:bg-green-900 hover:text-white transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
