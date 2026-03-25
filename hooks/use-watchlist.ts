"use client";

import { useContext } from "react";
import { WatchListContext } from "@/context/watchlist-context";

export function useWatchlist() {
  return useContext(WatchListContext);
}
