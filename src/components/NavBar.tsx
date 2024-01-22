import { Link } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";
import { CONSTANTS } from "../helpers/Constants";

const tabItems = [
  {
    name: "Movies",
    path: `/${CONSTANTS.ENV.BASE_URL}/media/MOVIES/DISCOVER`,
  },
  {
    name: "TV Series",
    path: `/${CONSTANTS.ENV.BASE_URL}/media/SHOWS/DISCOVER`,
  },
  {
    name: "Search",
    path: `/${CONSTANTS.ENV.BASE_URL}/search`,
  },
];
const NavBar = () => {
  return (
    <div className="navbar bg-neutral px-1 py-0 overflow-x-auto">
      <div className="flex-1">
        <Link
          className="btn btn-ghost text-sm md:text-md lg:text-xl text"
          to="/movies-and-series/"
        >
          MediaBox
        </Link>
      </div>
      <div className="flex-none">
        <ul className="px-1 flex flex-row items-center gap-5 lg:gap-10">
          {tabItems.map(({ name, path }) => (
            <li key={name}>
              <Link className="text-sm md:text-md text" to={path}>
                {name}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
