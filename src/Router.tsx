import React, { Suspense } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import BackDrop from "./components/common/BackDrop.tsx";
const PageNotFound = React.lazy(() => import("./pages/PageNotFound.tsx"));
const MediaDetailsPage = React.lazy(() => import("./pages/MediaDetailsPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const WatchList = React.lazy(() => import("./pages/WatchList"));
const CategoryMediaPage = React.lazy(
  () => import("./pages/CategoryMediaPage.tsx")
);
const HomePage = React.lazy(() => import("./pages/HomePage"));

const routeObj: RouteObject[] = [
  {
    path: "/movies-and-series/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<BackDrop />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "details/:mediaType/:id",
        element: (
          <Suspense fallback={<BackDrop />}>
            <MediaDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "media/:mediaType/:category",
        element: (
          <Suspense fallback={<BackDrop />}>
            <CategoryMediaPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<BackDrop />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "watchlist",
        element: (
          <Suspense fallback={<BackDrop />}>
            <WatchList />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "notfound",
    element: (
      <Suspense fallback={<BackDrop />}>
        <PageNotFound />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<BackDrop />}>
        <PageNotFound />
      </Suspense>
    ),
  },
];
const Router = createBrowserRouter(routeObj);

export default Router;
