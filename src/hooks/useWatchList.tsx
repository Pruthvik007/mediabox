import { useContext } from "react";
import { WatchListContext } from "../context/WatchListContext";

export const useWatchList = () => useContext(WatchListContext);
