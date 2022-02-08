import React, { useState, useCallback } from "react";
import { useSnackbar } from "notistack";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "@mui/material/Hidden";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import useI18nContext from "../../../hooks/useI18nContext";
import arcanaNetworkSDK from "../../../sdks/arcanaNetwork";

function Upload() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = useCallback(() => {
    enqueueSnackbar(t("uploadFileSuccessfully"), {
      variant: "success",
    });
    setLoading(false);
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    enqueueSnackbar(t("uploadFileFailed"), {
      variant: "error",
    });
    setLoading(false);
  }, [enqueueSnackbar, t]);

  const handleUploadFile = useCallback(
    async (e) => {
      try {
        setLoading(true);
        const file: File = e.dataTransfer
          ? e.dataTransfer.files[0]
          : e.target.files[0];
        if (file) {
          await arcanaNetworkSDK.uploadFile(file, {
            onProgress: (bytesUploaded, bytesTotal) => {
              console.log(bytesUploaded, bytesTotal);
            },
            onSuccess: handleSuccess,
            onError: handleError,
          });
        } else {
          handleError();
        }
      } catch (e) {
        console.log(e);
        handleError();
      }
    },
    [handleSuccess, handleError]
  );

  return (
    <label htmlFor="contained-button-file">
      <input
        accept="*"
        id="contained-button-file"
        type="file"
        style={{ display: "none" }}
        multiple={false}
        disabled={loading}
        onChange={handleUploadFile}
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
        disabled={loading}
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
