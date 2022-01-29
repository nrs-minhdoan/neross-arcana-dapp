import { lazy } from "react";

import { AUTH_ROUTES } from "../constants/routes.constant";

const Auth = lazy(() => import("../containers/auth/Auth"));

const routes = [
  {
    path: AUTH_ROUTES.AUTH,
    component: Auth,
  },
];

export default routes;
