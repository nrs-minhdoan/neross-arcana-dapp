import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import withAuth from "../../hocs/withAuth";
import useI18nContext from "../../hooks/useI18nContext";
import { redirectPage } from "../../sdks/arcanaAuth";

import useStyles from "./authRedirect.style";

function AuthRedirect() {
  const classes = useStyles();
  const { t } = useI18nContext();

  useEffect(() => {
    redirectPage();
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.loading}>
        <CircularProgress size={48} color="secondary" />
        <Typography variant="body1" sx={{ marginTop: "1rem" }}>
          {t("redirecting")}
        </Typography>
      </Box>
    </Box>
  );
}

export default withAuth(AuthRedirect, { needAuth: false });
