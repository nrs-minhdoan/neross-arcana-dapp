import React, { useCallback } from "react";

import Button from "@mui/material/Button";

import { Google } from "../../assets/images";
import useI18nContext from "../../hooks/useI18nContext";
import { loginWithGoogle } from "../../sdks/arcanaAuth";

function GoogleAuth() {
  const { t } = useI18nContext();

  const login = useCallback(() => {
    loginWithGoogle()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      sx={{ width: "100%" }}
      onClick={login}
    >
      <img style={{ marginRight: "0.5rem" }} src={Google} alt="" />{" "}
      {t("unlockWithGoogle")}
    </Button>
  );
}

export default GoogleAuth;
