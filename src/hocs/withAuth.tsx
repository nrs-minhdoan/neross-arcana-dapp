import React, { ComponentClass, FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { AUTH_ROUTES, MAIN_ROUTES } from "../constants/routes.constant";

interface WithAuthOption {
  needAuth?: boolean;
  unMatchingRedirect?: string;
}

export default function withAuth(
  InnerComponent: ComponentClass<any> | FC,
  customOptions?: WithAuthOption
) {
  const options = {
    needAuth: true,
    ...customOptions,
  };
  if (!options.unMatchingRedirect) {
    options.unMatchingRedirect = options.needAuth
      ? AUTH_ROUTES.AUTH
      : MAIN_ROUTES.MAIN;
  }
  const WithAuth: FC = ({ ...props }: any) => {
    const isAuth = useSelector((store) => !!store.auth.token);

    if (options.needAuth !== isAuth) {
      return (
        <Navigate
          to={{ pathname: options.unMatchingRedirect }}
          replace={true}
        />
      );
    }
    return <InnerComponent {...props} />;
  };
  return WithAuth;
}
