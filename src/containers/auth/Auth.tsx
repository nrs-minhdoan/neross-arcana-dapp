import React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import withAuth from "../../hocs/withAuth";
import GoogleAuth from "../../components/auth/GoogleAuth";
import useI18nContext from "../../hooks/useI18nContext";

import sanitizeHtml from "../../utils/sanitizeHtml";

import useStyles from "./auth.style";

function Auth() {
  const classes = useStyles();
  const { loading } = useSelector((store) => store.auth);
  const { t } = useI18nContext();

  return (
    <Box className={classes.container}>
      <p
        className={cx(classes.description, {
          [classes.descriptionInvisible]: loading,
        })}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(t("agreePrivacyAndTerms")),
        }}
      />
      <Box
        className={cx(classes.loading, {
          [classes.loadingInvisible]: !loading,
        })}
      >
        <CircularProgress size={48} color="secondary" />
        <Typography variant="body1" sx={{ marginTop: "1rem" }}>
          {t("connecting")}
        </Typography>
      </Box>
      <Box
        className={cx(classes.buttonGroup, {
          [classes.buttonGroupInvisible]: loading,
        })}
      >
        <GoogleAuth />
      </Box>
    </Box>
  );
}

export default withAuth(Auth, { needAuth: false });
