import React, { Suspense, useMemo, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { validateSession } from "../../store/auth/auth.action";
import useI18nContext from "../../hooks/useI18nContext";
import Header from "./header/Header";
import SideBar from "./side-bar/SideBar";
import Upload from "../../components/file/upload/Upload";

import useStyles from "./app.layout.style";

function AppLayout() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const title = useMemo(() => {
    if (matchPath("/my-files", location.pathname)) {
      return t("myFiles");
    } else if (matchPath("/shared-with-me", location.pathname)) {
      return t("sharedWithMe");
    } else {
      return "";
    }
  }, [location.pathname, t]);

  const handleSuccess = useCallback(() => {
    enqueueSnackbar(t("connected"), {
      variant: "success",
    });
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    enqueueSnackbar(t("disconnected"), {
      variant: "success",
    });
  }, [enqueueSnackbar, t]);

  useEffect(() => {
    dispatch(
      validateSession({
        callbacks: {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      })
    );
  }, [dispatch, handleSuccess, handleError]);

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
