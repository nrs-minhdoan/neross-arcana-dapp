import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";

import { PaletteMode } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { default as MuiThemeProvider } from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../assets/themes/theme";

import { THEME_KEY } from "../constants/theme.constant";

export type TPalletModeWithSystem = PaletteMode | "system";

interface IThemeContextValues {
  mode: TPalletModeWithSystem;
  changeMode: (mode?: TPalletModeWithSystem) => void;
}

export const ThemeContext = createContext<undefined | IThemeContextValues>(
  undefined
);

interface IProps {}

function ThemeProvider({ children }: PropsWithChildren<IProps>) {
  const [currentMode, setCurrentMode] = useState<TPalletModeWithSystem>("dark");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return createTheme(
      getDesignTokens(
        currentMode === "system"
          ? prefersDarkMode
            ? "dark"
            : "light"
          : (currentMode as PaletteMode)
      )
    );
  }, [currentMode, prefersDarkMode]);

  useEffect(() => {
    const mode = localStorage.getItem(THEME_KEY);
    setCurrentMode((mode as TPalletModeWithSystem) || "dark");
  }, []);

  const handleChangeMode = useCallback((mode?: TPalletModeWithSystem) => {
    setCurrentMode(mode || "dark");
    localStorage.setItem(THEME_KEY, mode || "dark");
  }, []);

  const values = useMemo<IThemeContextValues>(
    () => ({
      mode: currentMode,
      changeMode: handleChangeMode,
    }),
    [currentMode, handleChangeMode]
  );

  return (
    <ThemeContext.Provider value={values}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
