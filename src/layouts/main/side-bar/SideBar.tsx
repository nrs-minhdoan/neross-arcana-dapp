import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
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
import LockIcon from "@mui/icons-material/Lock";

import { MAIN_ROUTES } from "../../../constants/routes.constant";
import useI18nContext from "../../../hooks/useI18nContext";
import { destroySession } from "../../../store/auth/auth.action";

import useStyles from "./sideBar.style";

function SideBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = useCallback(() => {
    dispatch(destroySession());
    enqueueSnackbar(t("lockSuccessfully"), {
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
              value={10}
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
              0B / {t("unlimited")}
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
              value={10}
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
              0B / {t("unlimited")}
            </Typography>
          </Box>
        </Box>
      </Hidden>
      <List component="nav">
        <ListItemButton
          selected={!!matchPath(MAIN_ROUTES.MY_FILES, location.pathname)}
          onClick={() => {
            navigate(MAIN_ROUTES.MY_FILES);
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
          selected={!!matchPath(MAIN_ROUTES.SHARED_WITH_ME, location.pathname)}
          onClick={() => {
            navigate(MAIN_ROUTES.SHARED_WITH_ME);
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
            <LockIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
              },
              color: "error",
            }}
            primary={t("lock")}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default SideBar;
