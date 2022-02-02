import React from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "@mui/material/Hidden";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import useI18nContext from "../../../hooks/useI18nContext";

function Upload() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useI18nContext();

  return (
    <label htmlFor="contained-button-file">
      <input
        accept="*"
        id="contained-button-file"
        type="file"
        style={{ display: "none" }}
      />
      <Button
        sx={{
          textTransform: "none",
          minWidth: matches ? "2.25rem" : "unset",
          height: "2.25rem",
          padding: matches ? 0 : "0 0.5rem",
        }}
        variant="contained"
        component="span"
        color="secondary"
      >
        <UploadFileIcon sx={{ marginRight: matches ? 0 : "0.5rem" }} />
        <Hidden implementation="css" mdDown={true}>
          {t("uploadFile")}
        </Hidden>
      </Button>
    </label>
  );
}

export default Upload;
