import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES, AUTH_ROUTES, APP_ROUTES } from "../constants/routes.constant";

const AuthLayout = lazy(() => import("../layouts/auth/Auth.layout"));

const MainLayout = lazy(() => import("../layouts/main/Main.layout"));

const Auth = lazy(() => import("../containers/auth/Auth"));

const MyFiles = lazy(() => import("../containers/my-files/MyFiles"));

const SharedWithMe = lazy(
  () => import("../containers/shared-with-me/SharedWithMe")
);

const routes = [
  {
    key: "auth-layout",
    path: ROUTES.AUTH,
    element: <AuthLayout />,
    children: [
      {
        key: "auth",
        index: true,
        path: AUTH_ROUTES.AUTH,
        element: <Auth />,
      },
    ],
  },
  {
    key: "app-layout",
    path: ROUTES.APP,
    element: <MainLayout />,
    children: [
      {
        key: "main",
        index: true,
        path: APP_ROUTES.APP,
        element: <Navigate to={APP_ROUTES.MY_FILES} replace={true} />,
      },
      {
        key: "my-files",
        path: APP_ROUTES.MY_FILES,
        element: <MyFiles />,
      },
      {
        key: "shared-with-me",
        path: APP_ROUTES.SHARED_WITH_ME,
        element: <SharedWithMe />,
      },
    ],
  },
  {
    key: "index",
    path: "*",
    element: <Navigate to={ROUTES.APP} replace={true} />,
    children: [],
  },
];

export default routes;
