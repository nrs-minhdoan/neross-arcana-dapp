import React from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import withAuth from "../../hocs/withAuth";
import { Logo } from "../../assets/images";

import "./my-files.css";

function MyFiles() {
  const { t } = useTranslation();

  return (
    <div className={"my-files-container"}>
      <img src={Logo} alt="" />
      {t("appName")}
      <Button type="button" variant="contained">
        <GoogleIcon /> {t("loginWithGoogle")}
      </Button>
    </div>
  );
}

export default withAuth(MyFiles);
