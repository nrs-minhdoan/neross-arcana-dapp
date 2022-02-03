import React, { Suspense, useMemo } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Header from "./header/Header";
import SideBar from "./side-bar/SideBar";
import Upload from "../../components/file/upload/Upload";
import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./app.layout.style";

function AppLayout() {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useI18nContext();

  const title = useMemo(() => {
    if (matchPath("/my-files", location.pathname)) {
      return t("myFiles");
    } else if (matchPath("/shared-with-me", location.pathname)) {
      return t("sharedWithMe");
    } else {
      return "";
    }
  }, [location.pathname, t]);

  return (
    <Box className={classes.container}>
      <Header />
      <Box className={classes.content}>
        <SideBar />
        <Box sx={{ flex: 1, padding: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              {title}
            </Typography>
            <Upload />
          </Box>
          <Suspense fallback={<div />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
