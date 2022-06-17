import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { deleteFile } from "../../../store/file/file.action";
import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
}

function Delete({ id }: IProps) {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSuccess = useCallback(() => {
    enqueueSnackbar(t("deleteSuccessfully"), {
      variant: "success",
    });
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    setLoading(false);
    enqueueSnackbar(t("deleteFailed"), {
      variant: "error",
    });
  }, [enqueueSnackbar, t]);

  const handleDelete = useCallback(() => {
    setLoading(true);
    dispatch(
      deleteFile.request({
        id,
        callbacks: {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      })
    );
    toggleDialog();
  }, [dispatch, id, handleSuccess, handleError, toggleDialog]);

  return (
    <>
      <Tooltip
        title={(loading ? t("deleting") : t("delete")) as string}
        placement="top"
      >
        <span>
          <IconButton type="button" disabled={loading} onClick={toggleDialog}>
            <DeleteForeverIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Dialog
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            backgroundImage: "none",
          },
        }}
        open={open}
        onClose={toggleDialog}
      >
        <DialogTitle>{t("delete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("deleteDescription")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={toggleDialog}>
            {t("cancel")}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            sx={{
              backgroundColor: "error.main",
              color: "text.neutral",
              "&:hover": {
                color: "error.main",
              },
            }}
            onClick={handleDelete}
          >
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Delete;
