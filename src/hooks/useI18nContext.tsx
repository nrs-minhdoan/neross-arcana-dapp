import { useContext } from "react";

import { I18nContext } from "../contexts/i18n.context";

function useI18nContext() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("I18n context hook is not used correctly");
  }

  return context;
}

export default useI18nContext;
