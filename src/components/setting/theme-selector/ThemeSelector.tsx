import React, { useMemo } from "react";

import { SvgIconComponent } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

import useThemeContext, {
  TPalletModeWithSystem,
} from "../../../hooks/useThemeContext";
import useI18nContext from "../../../hooks/useI18nContext";

import useStyles from "./themeSelector.style";

function ThemeSelector() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { t } = useI18nContext();
  const { mode, changeMode } = useThemeContext();

  const themeOptions = useMemo<
    Array<{
      label: string;
      value: TPalletModeWithSystem;
      Icon: SvgIconComponent;
    }>
  >(() => {
    return [
      {
        label: t("light"),
        value: "light",
        Icon: LightModeIcon,
      },
      {
        label: t("system"),
        value: "system",
        Icon: SettingsBrightnessIcon,
      },
      {
        label: t("dark"),
        value: "dark",
        Icon: DarkModeIcon,
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
        {t("theme")}
      </Typography>
      <ButtonGroup
        variant="outlined"
        sx={{ width: "100%" }}
        orientation={matches ? "horizontal" : "vertical"}
      >
        {themeOptions.map(({ label, value, Icon }) => (
          <Button
            key={value}
            type="button"
            color="primary"
            variant={mode === value ? "contained" : "outlined"}
            sx={{
              flex: 1,
              whiteSpace: "nowrap",
              textTransform: "none",
              color: mode === value ? "text.primary" : "primary.main",
            }}
            onClick={() => {
              changeMode(value);
            }}
          >
            <Icon sx={{ marginRight: "0.5rem" }} />
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default ThemeSelector;
