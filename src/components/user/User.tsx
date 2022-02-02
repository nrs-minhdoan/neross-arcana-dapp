import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

import Information from "./information/Information";
import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./user.style";

function User() {
  const { userInfo } = useSelector((store) => store.auth);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useI18nContext();
  const [open, setOpen] = useState<boolean>();

  const toggleDrawer = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <Button
        type="button"
        sx={{
          textTransform: "lowercase",
          minWidth: matches ? "2.25rem" : "unset",
          height: "2.25rem",
          padding: matches ? 0 : "0 0.5rem",
          borderRadius: "0.25rem",
          margin: "0 0.5rem",
        }}
        variant="outlined"
        color="primary"
        onClick={toggleDrawer}
      >
        <Avatar
          src={userInfo?.avatar}
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: matches ? 0 : "0.5rem",
          }}
          alt=""
        />
        <Hidden implementation="css" mdDown={true}>
          {userInfo?.email}
        </Hidden>
      </Button>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: "22.5rem",
            maxWidth: "calc(100% - 3.5rem)",
            backgroundImage: "none",
          },
        }}
        open={open}
        onClose={toggleDrawer}
      >
        <Box>
          <Box className={classes.heading}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              {t("userInformation")}
            </Typography>
            <IconButton type="button" onClick={toggleDrawer}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
          <Divider sx={{ marginBottom: "1.5rem" }} />
          <Information />
        </Box>
      </Drawer>
    </>
  );
}

export default User;
