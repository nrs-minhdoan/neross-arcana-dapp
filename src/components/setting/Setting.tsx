import React, { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

import useI18nContext from "../../hooks/useI18nContext";
import ThemeSelector from "./theme-selector/ThemeSelector";
import LanguageSelector from "./language-selector/LanguageSelector";

import useStyles from "./setting.style";

function Setting() {
  const classes = useStyles();
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
          minWidth: "2.25rem",
          width: "2.25rem",
          height: "2.25rem",
          padding: 0,
          borderRadius: "0.25rem",
        }}
        variant="outlined"
        color="primary"
        onClick={toggleDrawer}
      >
        <SettingsIcon />
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
              {t("settings")}
            </Typography>
            <IconButton type="button" onClick={toggleDrawer}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
          <Divider sx={{ marginBottom: "1.5rem" }} />
          <ThemeSelector />
          <LanguageSelector />
        </Box>
      </Drawer>
    </>
  );
}

export default Setting;
