import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES, AUTH_ROUTES, APP_ROUTES } from "../constants/routes.constant";

const AuthLayout = lazy(() => import("../layouts/auth/Auth.layout"));

const AppLayout = lazy(() => import("../layouts/app/App.layout"));

const Auth = lazy(() => import("../containers/auth/Auth"));

const AuthRedirect = lazy(
  () => import("../containers/auth-redirect/AuthRedirect")
);

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
        path: AUTH_ROUTES.AUTH,
        element: <Auth />,
      },
      {
        key: "auth-redirect",
        path: AUTH_ROUTES.AUTH_REDIRECT,
        element: <AuthRedirect />,
      },
    ],
  },
  {
    key: "app-layout",
    path: ROUTES.APP,
    element: <AppLayout />,
    children: [
      {
        key: "main",
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
];

export default routes;
