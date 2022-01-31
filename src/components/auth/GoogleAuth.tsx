import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";

import CONFIG from "../../config";
import { plainToClass } from "../../utils/classTransformer";
import { UserInfo } from "../../models/store/auth.model";
import { Google } from "../../assets/images";
import useI18nContext from "../../hooks/useI18nContext";
import {
  initSession,
  loadSession,
  unloadSession,
} from "../../store/auth/auth.action";

function GoogleAuth() {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginGoogle = useCallback(() => {
    dispatch(loadSession());
  }, [dispatch]);

  const handleLoginGoogleSuccess = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!response.code) {
        setTimeout(() => {
          dispatch(
            initSession({
              token: (response as GoogleLoginResponse).tokenId,
              userInfo: plainToClass(
                UserInfo,
                (response as GoogleLoginResponse).profileObj
              ),
            })
          );
          enqueueSnackbar(t("loginSuccessfully"), {
            variant: "success",
            color: "",
          });
        }, 1500);
      } else {
        dispatch(unloadSession());
        enqueueSnackbar(t("loginFailed"), {
          variant: "error",
        });
      }
    },
    [dispatch, enqueueSnackbar, t]
  );

  const handleLoginGoogleFailed = useCallback(() => {
    dispatch(unloadSession());
    enqueueSnackbar(t("loginFailed"), { variant: "error" });
  }, [dispatch, enqueueSnackbar, t]);

  const { signIn } = useGoogleLogin({
    clientId: CONFIG.GOOGLE_CLIENT_ID,
    onRequest: handleLoginGoogle,
    onSuccess: handleLoginGoogleSuccess,
    onFailure: handleLoginGoogleFailed,
  });

  return (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      sx={{ width: "100%" }}
      onClick={signIn}
    >
      <img style={{ marginRight: "0.5rem" }} src={Google} alt="" />{" "}
      {t("loginWithGoogle")}
    </Button>
  );
}

export default GoogleAuth;
