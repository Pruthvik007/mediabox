import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CrossIcon from "../assets/icons/svgs/CrossIcon";
import MenuIcon from "../assets/icons/svgs/MenuIcon";
import { CONSTANTS } from "../helpers/Constants";
import ThemeToggle from "./common/ThemeToggle";

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
  const location = useLocation();
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleNav = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-neutral flex justify-between items-center h-20 px-4 text-white">
      <Link
        className="btn btn-ghost"
        id="desktop-logo"
        to={CONSTANTS.ENV.BASE_URL}
      >
        <p className="text-xl text-primary">MediaBox</p>
      </Link>
      <div id="desktop-nav-items" className="hidden md:flex md:items-center">
        {navItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <div
              className={`p-4 hover:bg-primary rounded-xl m-2 cursor-pointer duration-300 hover:text-black ${
                isCurrentPath(item.path) && "bg-primary text-black"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <div className="p-2 hover:bg-primary rounded-xl m-2 cursor-pointer duration-300 flex items-center">
          <ThemeToggle />
        </div>
        <div
          id="mobile-nav-toggle"
          onClick={toggleNav}
          className="block md:hidden"
        >
          {isVisible ? <CrossIcon /> : <MenuIcon />}
        </div>
      </div>
      <div
        id="mobile-nav-items"
        className={
          isVisible
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-base-300 ease-in-out duration-500 z-50"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {navItems.map((item) => (
          <Link onClick={toggleNav} to={item.path} key={item.path}>
            <div className="p-4 border-b rounded-xl hover:bg-primary duration-300 hover:text-black cursor-pointer border-gray-600">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
