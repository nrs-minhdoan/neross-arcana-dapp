import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import Header from "./header/Header";
import SideBar from "./side-bar/SideBar";

import useStyles from "./main.layout.style";

function MainLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />
      <Box className={classes.content}>
        <SideBar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
