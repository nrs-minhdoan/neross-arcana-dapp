import React from "react";
import { Outlet } from "react-router-dom";

import "./auth.layout.css";

function AuthLayout() {
  return (
    <div className={"auth-layout-container"}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
