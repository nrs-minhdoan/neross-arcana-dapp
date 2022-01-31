import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import Header from "./header/Header";

import useStyles from "./auth.layout.style";

function AuthLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
