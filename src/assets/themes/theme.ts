import { PaletteMode, ThemeOptions } from "@mui/material";

const getDesignTokens: (mode: PaletteMode) => ThemeOptions = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#0777ed",
          },
          secondary: {
            main: "#0777ed",
          },
          success: {
            main: "#008554",
          },
          error: {
            main: "#c12532",
          },
          divider: "#0777ed",
          text: {
            primary: "rgba(0, 0, 0, 0.54)",
            secondary: "rgba(0, 0, 0, 0.54)",
          },
          background: {
            default: "#ffffff",
            paper: "#ffffff",
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
