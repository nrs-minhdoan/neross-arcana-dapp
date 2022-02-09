import React, { useState, useCallback } from "react";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import ShareIcon from "@mui/icons-material/Share";

import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
}

function Share({ id }: IProps) {
  const { t } = useI18nContext();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

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
        onClose={toggleDialog}
      >
        <DialogTitle>{t("share")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label={t("email")}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>{t("cancel")}</Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ backgroundColor: "primary.main", color: "text.primary" }}
            onClick={toggleDialog}
          >
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Share;
