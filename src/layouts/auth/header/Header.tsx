import React from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Setting from "../../../components/setting/Setting";
import { Logo } from "../../../assets/images";
import useI18nContext from "../../../hooks/useI18nContext";

import useStyles from "./header.style";

function Header() {
  const classes = useStyles();
  const { t } = useI18nContext();

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.appBrand}>
          <Avatar
            src={Logo}
            imgProps={{
              sx: (theme) => ({
                objectFit: "contain",
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.text.primary})`,
              }),
            }}
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              marginRight: "0.5rem",
            }}
            alt=""
          />
          <Typography
            variant="h6"
            sx={(theme) => ({
              fontWeight: "normal",
              letterSpacing: "0.125rem",
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.text.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            })}
          >
            {t("appName")}
          </Typography>
        </Box>
        <Setting />
      </Box>
      <Divider />
    </Box>
  );
}

export default Header;
