import { lazy } from "react";

import { MAIN_ROUTES } from "../constants/routes.constant";

const MyFiles = lazy(() => import("../containers/my-files/MyFiles"));

const SharedWithMe = lazy(
  () => import("../containers/shared-with-me/SharedWithMe")
);

const routes = [
  {
    path: MAIN_ROUTES.MY_FILES,
    component: MyFiles,
  },
  {
    path: MAIN_ROUTES.SHARED_WITH_ME,
    component: SharedWithMe,
  },
];

export default routes;
