import React from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./user.style";

function User() {
  const { userInfo } = useSelector((store) => store.auth);
  const classes = useStyles();
  const { t } = useI18nContext();

  return (
    <>
      <Button
        type="button"
        sx={{
          textTransform: "lowercase",
          height: "2.25rem",
          padding: "0 0.5rem",
          borderRadius: "0.5rem",
          margin: "0 0.5rem",
        }}
        variant="outlined"
        color="primary"
      >
        <Avatar
          src={userInfo?.avatar}
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            marginRight: "0.5rem",
          }}
          alt=""
        />
        {userInfo?.email}
      </Button>
    </>
  );
}

export default User;
