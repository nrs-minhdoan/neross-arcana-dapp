import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
  onClose: () => void;
}

function Delete({ id, onClose }: IProps) {
  const { t } = useI18nContext();

  return (
    <Dialog fullWidth maxWidth="xs" open={!!id} onClose={onClose}>
      <DialogTitle>{t("delete")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("deleteDescription")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ backgroundColor: "error.main", color: "text.primary" }}
          onClick={onClose}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Delete;
