import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import { useTranslation, TFunction } from "react-i18next";
import Cookie from "js-cookie";

import { LANGUAGE_KEY, ELanguages } from "../constants/i18n.constants";

interface II18nContextValues {
  t: TFunction;
  currentLanguage: ELanguages;
  changeLanguage: (language?: ELanguages) => void;
}

export const I18nContext = createContext<undefined | II18nContextValues>(
  undefined
);

interface IProps {}

function I18nProvider({ children }: PropsWithChildren<IProps>) {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<ELanguages>(
    ELanguages.English
  );

  useEffect(() => {
    const language = Cookie.get(LANGUAGE_KEY);
    setCurrentLanguage((language as ELanguages) || ELanguages.English);
    i18n.changeLanguage((language as ELanguages) || ELanguages.English);
  }, [i18n]);

  const handleChangeLanguage = useCallback(
    (language?: ELanguages) => {
      setCurrentLanguage(language || ELanguages.English);
      Cookie.set(LANGUAGE_KEY, language || ELanguages.English, {
        expires: 99999999999999,
      });
      i18n.changeLanguage(language || ELanguages.English);
    },
    [i18n]
  );

  const values = useMemo<II18nContextValues>(
    () => ({
      t,
      currentLanguage,
      changeLanguage: handleChangeLanguage,
    }),
    [t, currentLanguage, handleChangeLanguage]
  );

  return <I18nContext.Provider value={values}>{children}</I18nContext.Provider>;
}

export default I18nProvider;
