import React from "react";

import Box from "@mui/material/Box";

import withAuth from "../../hocs/withAuth";
import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./myFiles.style";

function MyFiles() {
  const classes = useStyles();
  const { t } = useI18nContext();

  return <Box className={classes.container}></Box>;
}

export default withAuth(MyFiles);
