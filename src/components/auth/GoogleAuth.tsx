import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";

import { initSessionWithGoogle } from "../../store/auth/auth.action";
import { Google } from "../../assets/images";
import useI18nContext from "../../hooks/useI18nContext";

function GoogleAuth() {
  const dispatch = useDispatch();
  const { t } = useI18nContext();

  const unlock = useCallback(() => {
    dispatch(initSessionWithGoogle.request());
  }, [dispatch]);

  return (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      sx={{ width: "100%" }}
      onClick={unlock}
    >
      <img style={{ marginRight: "0.5rem" }} src={Google} alt="" />{" "}
      {t("unlockWithGoogle")}
    </Button>
  );
}

export default GoogleAuth;
