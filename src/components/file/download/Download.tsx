import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import DownloadIcon from "@mui/icons-material/Download";

import useI18nContext from "../../../hooks/useI18nContext";
import { downloadFile } from "../../../store/file/file.action";

interface IProps {
  id: string;
}

function Download({ id }: IProps) {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleProgress = useCallback(
    async (bytesUploaded: number, bytesTotal: number) => {
      const temp = (bytesUploaded / bytesTotal) * 100;
      if (temp < 100) {
        setProgress(temp);
      }
    },
    []
  );

  const handleSuccess = useCallback(async () => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
      enqueueSnackbar(t("downloadSuccessfully"), {
        variant: "success",
      });
    }, 500);
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    enqueueSnackbar(t("downloadFailed"), {
      variant: "error",
    });
    setLoading(false);
  }, [enqueueSnackbar, t]);

  const handleDownloadFile = useCallback(() => {
    setLoading(true);
    dispatch(
      downloadFile.request({
        id,
        callbacks: {
          onProgress: handleProgress,
          onSuccess: handleSuccess,
          onError: handleError,
        },
      })
    );
  }, [dispatch, id, handleProgress, handleSuccess, handleError]);

  return (
    <>
      <Tooltip title={t("download") as string} placement="top">
        <IconButton type="button" onClick={handleDownloadFile}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>

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
            {t("downloading")}
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

export default Download;
