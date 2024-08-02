import React, { Suspense } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import BackDrop from "./components/common/BackDrop.tsx";
import { CONSTANTS } from "./helpers/Constants.ts";
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const MediaDetailsPage = React.lazy(() => import("./pages/MediaDetailsPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const WatchList = React.lazy(() => import("./pages/WatchList"));
const CategoryMediaPage = React.lazy(
  () => import("./pages/CategoryMediaPage.tsx")
);
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
import HomePage from "./pages/HomePage.tsx";
const routeObj: RouteObject[] = [
  {
    path: CONSTANTS.ENV.BASE_URL,
    element: <App />,
    errorElement: <ErrorPage />,
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
