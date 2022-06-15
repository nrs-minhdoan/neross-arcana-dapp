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
import BackspaceIcon from "@mui/icons-material/Backspace";

import { revokeFile } from "../../../store/file/file.action";
import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
  address: string;
}

function Revoke({ id, address }: IProps) {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSuccess = useCallback(() => {
    enqueueSnackbar(t("revokeSuccessfully"), {
      variant: "success",
    });
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    setLoading(false);
    enqueueSnackbar(t("revokeFailed"), {
      variant: "error",
    });
  }, [enqueueSnackbar, t]);

  const handleDelete = useCallback(() => {
    setLoading(true);
    dispatch(
      revokeFile.request({
        id,
        address,
        callbacks: {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      })
    );
    toggleDialog();
  }, [dispatch, id, address, handleSuccess, handleError, toggleDialog]);

  return (
    <>
      <Tooltip
        title={(loading ? t("revoking") : t("revoke")) as string}
        placement="top"
      >
        <span>
          <IconButton type="button" disabled={loading} onClick={toggleDialog}>
            <BackspaceIcon />
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
        <DialogTitle>{t("revoke")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("revokeDescription")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={toggleDialog}>
            {t("cancel")}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            sx={{ backgroundColor: "error.main", color: "text.primary" }}
            onClick={handleDelete}
          >
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Revoke;
