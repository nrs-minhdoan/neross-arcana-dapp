import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import { ELanguages } from "../../../constants/i18n.constant";
import useI18nContext from "../../../hooks/useI18nContext";

import useStyles from "./languageSelector.style";

function LanguageSelector() {
  const classes = useStyles();
  const { t, language, changeLanguage } = useI18nContext();

  const languageOptions = useMemo(() => {
    return [
      {
        label: t("english"),
        value: ELanguages.English,
      },
      {
        label: t("vietnamese"),
        value: ELanguages.Vietnamese,
      },
    ];
  }, [t]);

  return (
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
        {t("language")}
      </Typography>
      <ButtonGroup
        variant="outlined"
        orientation="vertical"
        sx={{ width: "100%" }}
      >
        {languageOptions.map(({ label, value }) => (
          <Button
            key={value}
            type="button"
            color="primary"
            variant={language === value ? "contained" : "outlined"}
            sx={{
              textTransform: "none",
              color: language === value ? "text.primary" : "primary.main",
            }}
            onClick={() => {
              changeLanguage(value);
            }}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default LanguageSelector;
