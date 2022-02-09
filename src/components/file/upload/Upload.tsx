import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import useI18nContext from "../../../hooks/useI18nContext";
import { uploadFile } from "../../../store/file/file.action";

function Upload() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleProgress = useCallback(
    (bytesUploaded: number, bytesTotal: number) => {
      const temp = (bytesUploaded / bytesTotal) * 100;
      if (temp < 100) {
        setProgress(temp);
      }
    },
    []
  );

  const handleSuccess = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
      enqueueSnackbar(t("uploadSuccessfully"), {
        variant: "success",
      });
    }, 500);
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    enqueueSnackbar(t("uploadFailed"), {
      variant: "error",
    });
    setLoading(false);
  }, [enqueueSnackbar, t]);

  const handleUploadFile = useCallback(
    (e) => {
      setLoading(true);
      const file: File = e.dataTransfer
        ? e.dataTransfer.files[0]
        : e.target.files[0];
      if (file) {
        dispatch(
          uploadFile.request({
            file,
            callbacks: {
              onProgress: handleProgress,
              onSuccess: handleSuccess,
              onError: handleError,
            },
          })
        );
      } else {
        handleError();
      }
    },
    [dispatch, handleProgress, handleSuccess, handleError]
  );

  return (
    <>
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
            {t("upload")}
          </Hidden>
        </Button>
      </label>

      <Modal open={loading}>
        <Box
          sx={{
            position: "absolute",
            top: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "20rem",
            maxWidth: "80%",
            backgroundColor: "background.paper",
            borderRadius: "0.25rem",
            padding: "2rem",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{ marginBottom: "1rem" }}
          >
            {t("uploading")}
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
          <Typography
            variant="body2"
            component="p"
            sx={{ marginTop: "0.5rem", color: "text.secondary" }}
          >
            {progress}%
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Upload;
