import React from "react";
import { Outlet } from "react-router-dom";

import "./main.layout.css";

function MainLayout() {
  return (
    <div className={"main-layout-container"}>
      <Outlet />
    </div>
  );
}

export default MainLayout;
