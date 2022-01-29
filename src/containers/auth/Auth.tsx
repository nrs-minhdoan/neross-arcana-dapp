import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import { Logo } from "../../assets/images";
import "./login.css";

function Auth() {
  const { t } = useTranslation();

  return (
    <div className={"login-container"}>
      <img src={Logo} alt="" />
      {t("appName")}
      <Button type="button" variant="contained">
        <GoogleIcon /> {t("loginWithGoogle")}
      </Button>
    </div>
  );
}

export default Auth;
