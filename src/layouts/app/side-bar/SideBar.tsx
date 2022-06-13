import React, { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import EjectIcon from "@mui/icons-material/Eject";

import { APP_ROUTES } from "../../../constants/routes.constant";
import {
  getBandwidthStatus,
  getStorageStatus,
} from "../../../store/limit/limit.action";
import useI18nContext from "../../../hooks/useI18nContext";
import { destroySession } from "../../../store/auth/auth.action";

import { formatSizeInKB } from "../../../utils/common";

import useStyles from "./sideBar.style";

function SideBar() {
  const dispatch = useDispatch();
  const { storage, bandwidth } = useSelector((store) => store.limit);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const storageUsedPercent = useMemo(() => {
    return !storage.limit ? 0 : (storage.used / storage.limit) * 100;
  }, [storage]);

  const bandwidthUsedPercent = useMemo(() => {
    return !bandwidth.limit ? 0 : (bandwidth.used / bandwidth.limit) * 100;
  }, [bandwidth]);

  useEffect(() => {
    dispatch(getStorageStatus.request());
    dispatch(getBandwidthStatus.request());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(destroySession());
    enqueueSnackbar(t("disconnected"), {
      variant: "success",
    });
  }, [dispatch, enqueueSnackbar, t]);

  return (
    <Box className={classes.container}>
      <Hidden implementation="css" mdDown={true}>
        <Box className={classes.content}>
          <Box sx={{ marginBottom: "1rem" }}>
            <Typography
              variant="overline"
              component="p"
              sx={{
                lineHeight: "unset",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                color: "text.secondary",
              }}
            >
              {t("storageStatus")}
            </Typography>
            <LinearProgress
              sx={{ height: "0.5rem", borderRadius: "0.5rem" }}
              variant={"determinate"}
              value={storageUsedPercent}
            />
            <Typography
              variant="overline"
              component="p"
              sx={{
                textAlign: "center",
                lineHeight: "unset",
                fontWeight: "bold",
                marginTop: "0.5rem",
                color: "primary.main",
              }}
            >
              {formatSizeInKB(storage.used)} KB /{" "}
              {!storage.limit
                ? t("unlimited")
                : `${formatSizeInKB(storage.limit)} KB`}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              component="p"
              sx={{
                lineHeight: "unset",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                color: "text.secondary",
              }}
            >
              {t("bandwidthStatus")}
            </Typography>
            <LinearProgress
              sx={{ height: "0.5rem", borderRadius: "0.5rem" }}
              variant={"determinate"}
              value={bandwidthUsedPercent}
            />
            <Typography
              variant="overline"
              component="p"
              sx={{
                textAlign: "center",
                lineHeight: "unset",
                fontWeight: "bold",
                marginTop: "0.5rem",
                color: "primary.main",
              }}
            >
              {formatSizeInKB(bandwidth.used)} KB /{" "}
              {!bandwidth.limit
                ? t("unlimited")
                : `${formatSizeInKB(bandwidth.limit)} KB`}
            </Typography>
          </Box>
        </Box>
      </Hidden>
      <List component="nav">
        <ListItemButton
          selected={!!matchPath(APP_ROUTES.MY_FILES, location.pathname)}
          onClick={() => {
            navigate(APP_ROUTES.MY_FILES);
          }}
        >
          <ListItemIcon>
            <SnippetFolderIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
              },
            }}
            primary={t("myFiles")}
          />
        </ListItemButton>
        <ListItemButton
          selected={!!matchPath(APP_ROUTES.SHARED_WITH_ME, location.pathname)}
          onClick={() => {
            navigate(APP_ROUTES.SHARED_WITH_ME);
          }}
        >
          <ListItemIcon>
            <FolderSharedIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
              },
            }}
            primary={t("sharedWithMe")}
          />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <EjectIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
              },
              color: "error",
            }}
            primary={t("disconnect")}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default SideBar;
