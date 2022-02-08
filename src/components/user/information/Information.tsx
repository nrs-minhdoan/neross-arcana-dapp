import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

import useI18nContext from "../../../hooks/useI18nContext";
import copyToClipboard from "../../../utils/copyToClipboard";
import downloadJSON from "../../../utils/downloadJSON";

import useStyles from "./information.style";

function Information() {
  const { userInfo, walletAddress, publicKey, privateKey } = useSelector(
    (store) => store.auth
  );
  const classes = useStyles();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const information = useMemo(() => {
    return [
      { key: "name", value: userInfo?.name || "" },
      { key: "email", value: userInfo?.email || userInfo?.id || "" },
      { key: "wallet", value: walletAddress || "" },
    ];
  }, [userInfo, walletAddress]);

  const handleCopyToClipboard = useCallback(
    (value: string) => {
      copyToClipboard(value);
      enqueueSnackbar(t("copiedToClipboard"), { variant: "success" });
    },
    [enqueueSnackbar, t]
  );

  const handleDownloadKeys = useCallback(() => {
    downloadJSON(
      { publicKey, privateKey, walletAddress },
      `${t("appName")}-${userInfo?.email || userInfo?.id || ""}-keys`
    );
  }, [userInfo, privateKey, publicKey, walletAddress, t]);

  return (
    <>
      {information.map(({ key, value }) => (
        <Box className={classes.container}>
          <Typography
            variant="overline"
            component="p"
            sx={{
              lineHeight: "unset",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              color: "text.secondary",
            }}
          >
            {t(key)}
          </Typography>
          <Button
            type="button"
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              color: "text.primary",
              minHeight: "2.25rem",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              textTransform: "none",
              wordBreak: "break-all",
            }}
            variant="outlined"
            onClick={() => handleCopyToClipboard(value)}
          >
            {value}
          </Button>
        </Box>
      ))}
      <Box className={classes.container}>
        <Typography
          variant="overline"
          component="p"
          sx={{
            lineHeight: "unset",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            color: "text.secondary",
          }}
        >
          {t("downloadKeys")}
        </Typography>
        <Button
          type="button"
          sx={{
            width: "100%",
            height: "2.25rem",
            backgroundColor: "primary.main",
            color: "text.primary",
            padding: "0 0.5rem",
            borderRadius: "0.25rem",
            textTransform: "none",
          }}
          variant="outlined"
          onClick={handleDownloadKeys}
        >
          <DownloadIcon />
        </Button>
      </Box>
    </>
  );
}

export default Information;
