import { PaletteMode, ThemeOptions } from "@mui/material";

const getDesignTokens: (mode: PaletteMode) => ThemeOptions = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for dark mode
          primary: {
            main: "#4ba3fb",
          },
          secondary: {
            main: "#ffffff",
            contrastText: "#063975",
          },
          success: {
            main: "#4cbd94",
          },
          error: {
            main: "#f25461",
          },
          divider: "#4ba3fb",
          text: {
            primary: "#ffffff",
            secondary: "#c2c4c7",
          },
          background: {
            default: "#063975",
            paper: "#063975",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#4ba3fb",
          },
          secondary: {
            main: "#ffffff",
          },
          success: {
            main: "#4cbd94",
          },
          error: {
            main: "#f25461",
          },
          divider: "#4ba3fb",
          text: {
            primary: "#ffffff",
            secondary: "#c2c4c7",
          },
          background: {
            default: "#063975",
            paper: "#063975",
          },
        }),
  },
});

export { getDesignTokens };
