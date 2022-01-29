import { lazy } from "react";

import { APP_ROUTES } from "../constants/routes.constant";

const AuthLayout = lazy(() => import("../layouts/auth/auth.layout"));

const MainLayout = lazy(() => import("../layouts/main/main.layout"));

const routes = [
  {
    path: APP_ROUTES.AUTH,
    component: AuthLayout,
  },
  {
    path: APP_ROUTES.MAIN,
    component: MainLayout,
  },
];

export default routes;
