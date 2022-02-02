import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
  onClose: () => void;
}

function Share({ id, onClose }: IProps) {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog fullWidth maxWidth="xs" open={!!id} onClose={onClose}>
      <DialogTitle>{t("share")}</DialogTitle>
      <DialogContent>
        <TextField autoFocus label={t("email")} fullWidth variant="standard" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ backgroundColor: "primary.main", color: "text.primary" }}
          onClick={onClose}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Share;
