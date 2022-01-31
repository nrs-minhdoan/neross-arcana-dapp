import { lazy } from "react";
import { Navigate } from "react-router-dom";

import {
  APP_ROUTES,
  AUTH_ROUTES,
  MAIN_ROUTES,
} from "../constants/routes.constant";

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
    path: APP_ROUTES.AUTH,
    pattern: "/auth",
    exact: true,
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
    key: "main-layout",
    path: APP_ROUTES.MAIN,
    pattern: "/:path",
    exact: false,
    element: <MainLayout />,
    children: [
      {
        key: "main",
        index: true,
        path: MAIN_ROUTES.MAIN,
        element: <Navigate to={MAIN_ROUTES.MY_FILES} replace={true} />,
      },
      {
        key: "my-files",
        path: MAIN_ROUTES.MY_FILES,
        element: <MyFiles />,
      },
      {
        key: "shared-with-me",
        path: MAIN_ROUTES.SHARED_WITH_ME,
        element: <SharedWithMe />,
      },
    ],
  },
];

export default routes;
