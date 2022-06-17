import React, { ChangeEvent, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import ShareIcon from "@mui/icons-material/Share";

import { validateEmail } from "../../../utils/common";
import { shareFile } from "../../../store/file/file.action";
import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
}

function Share({ id }: IProps) {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isError = useMemo(() => {
    return dirty && (!email.trim() || !validateEmail(email));
  }, [dirty, email]);

  const errorMessage = useMemo(() => {
    if (isError) {
      if (!email.trim()) {
        return t("emailIsRequired");
      } else if (!validateEmail(email)) {
        return t("emailInvalid");
      }
    }
    return "";
  }, [email, isError, t]);

  const toggleDialog = useCallback(() => {
    setOpen(!open);
    setDirty(false);
    setEmail("");
  }, [open]);

  const handleChangeDirty = () => {
    setDirty(true);
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSuccess = useCallback(() => {
    enqueueSnackbar(t("shareSuccessfully"), {
      variant: "success",
    });
    setLoading(false);
    toggleDialog();
  }, [enqueueSnackbar, toggleDialog, t]);

  const handleError = useCallback(() => {
    enqueueSnackbar(t("shareFailed"), {
      variant: "error",
    });
    setLoading(false);
  }, [enqueueSnackbar, t]);

  const handleShareFile = useCallback(() => {
    setLoading(true);
    dispatch(
      shareFile.request({
        id,
        email,
        callbacks: {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      })
    );
  }, [dispatch, id, email, handleSuccess, handleError]);

  return (
    <>
      <Tooltip title={t("share") as string} placement="top">
        <IconButton type="button" onClick={toggleDialog}>
          <ShareIcon />
        </IconButton>
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
      >
        <DialogTitle>{t("share")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            disabled={loading}
            label={t("email")}
            required={true}
            fullWidth
            variant="standard"
            error={isError}
            value={email}
            onChange={handleChangeEmail}
            onBlur={handleChangeDirty}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleShareFile();
              }
            }}
            helperText={errorMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>{t("cancel")}</Button>
          <Button
            disabled={loading}
            variant="outlined"
            color="primary"
            sx={{
              backgroundColor: "primary.main",
              color: "text.neutral",
              "&:hover": {
                color: "primary.main",
              },
            }}
            onClick={handleShareFile}
          >
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Share;
