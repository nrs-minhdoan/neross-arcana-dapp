import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import Header from "../auth/header/Header";

import useStyles from "./main.layout.style";

function MainLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />
      <Outlet />
    </Box>
  );
}

export default MainLayout;
