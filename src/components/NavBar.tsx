import { Link } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";
import { CONSTANTS } from "../helpers/Constants";
import { useState } from "react";
import CrossIcon from "../assets/icons/svgs/CrossIcon";
import MenuIcon from "../assets/icons/svgs/MenuIcon";

const navItems = [
  {
    name: "Movies",
    path: `${CONSTANTS.ENV.BASE_URL}/media/movies/discover`,
  },
  {
    name: "TV Series",
    path: `${CONSTANTS.ENV.BASE_URL}/media/shows/discover`,
  },
  {
    name: "Search",
    path: `${CONSTANTS.ENV.BASE_URL}/search`,
  },
  {
    name: "Watchlist",
    path: `${CONSTANTS.ENV.BASE_URL}/watchlist`,
  },
];
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleNav = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-neutral flex justify-between items-center h-20 px-4 text-white">
      <Link
        className="btn btn-ghost text-xl text"
        id="desktop-logo"
        to={CONSTANTS.ENV.BASE_URL}
      >
        MediaBox
      </Link>
      <ul id="desktop-nav-items" className="hidden md:flex md:items-center">
        {navItems.map((item) => (
          <li
            key={item.path}
            className="p-4 hover:bg-primary rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        <li className="p-2 rounded-xl m-2 cursor-pointer hover:bg-primary flex items-center">
          <ThemeToggle />
        </li>
      </ul>
      <div
        id="mobile-nav-toggle"
        onClick={toggleNav}
        className="block md:hidden"
      >
        {isVisible ? <CrossIcon /> : <MenuIcon />}
      </div>
      <ul
        id="mobile-nav-items"
        className={
          isVisible
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-base-300 ease-in-out duration-500 z-50"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <div className="flex items-center justify-between p-3 gap-x-3">
          <Link
            className="text-xl text"
            id="mobile-logo"
            to={CONSTANTS.ENV.BASE_URL}
          >
            MediaBox
          </Link>
          <ThemeToggle />
        </div>
        {navItems.map((item) => (
          <li
            onClick={toggleNav}
            key={item.path}
            className="p-4 border-b rounded-xl hover:bg-primary duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
