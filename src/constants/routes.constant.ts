export const ROUTES = {
  AUTH: "/auth",
  APP: "",
};

export const AUTH_ROUTES = {
  AUTH: ROUTES.AUTH,
  AUTH_REDIRECT: `${ROUTES.AUTH}/redirect`,
};

export const APP_ROUTES = {
  APP: ROUTES.APP,
  MY_FILES: `${ROUTES.APP}/my-files`,
  SHARED_WITH_ME: `${ROUTES.APP}/shared-with-me`,
};
