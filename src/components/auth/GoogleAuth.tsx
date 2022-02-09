import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";

import { initSessionWithGoogle } from "../../store/auth/auth.action";
import { Google } from "../../assets/images";
import useI18nContext from "../../hooks/useI18nContext";

function GoogleAuth() {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleSuccess = useCallback(() => {
    enqueueSnackbar(t("connected"), { variant: "success" });
  }, [enqueueSnackbar, t]);

  const handleError = useCallback(() => {
    enqueueSnackbar(t("connectFailed"), { variant: "error" });
  }, [enqueueSnackbar, t]);

  const connect = useCallback(() => {
    dispatch(
      initSessionWithGoogle.request({
        onSuccess: handleSuccess,
        onError: handleError,
      })
    );
  }, [dispatch, handleSuccess, handleError]);

  return (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      sx={{ width: "100%" }}
      onClick={connect}
    >
      <img style={{ marginRight: "0.5rem" }} src={Google} alt="" />{" "}
      {t("connectWithGoogle")}
    </Button>
  );
}

export default GoogleAuth;
