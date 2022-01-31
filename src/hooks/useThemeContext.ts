import { useContext } from "react";

import {
  ThemeContext,
  TPalletModeWithSystem as PalletModeWithSystem,
} from "../contexts/theme.context";

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("I18n context hook is not used correctly");
  }

  return context;
}

export type TPalletModeWithSystem = PalletModeWithSystem;

export default useThemeContext;
