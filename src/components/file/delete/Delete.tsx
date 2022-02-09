import React, { useState, useCallback } from "react";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
}

function Delete({ id }: IProps) {
  const { t } = useI18nContext();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <Tooltip title={t("delete") as string} placement="top">
        <IconButton type="button" onClick={toggleDialog}>
          <DeleteForeverIcon />
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
        onClose={toggleDialog}
      >
        <DialogTitle>{t("delete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("deleteDescription")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>{t("cancel")}</Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ backgroundColor: "error.main", color: "text.primary" }}
            onClick={toggleDialog}
          >
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Delete;
