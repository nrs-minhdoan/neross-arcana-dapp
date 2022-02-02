import { AuthProvider } from "@arcana/auth";

import CONFIG from "../config";
import { AUTH_ROUTES } from "../constants/routes.constant";

export enum LoginType {
  google = "google",
  reddit = "reddit",
  discord = "discord",
  twitch = "twitch",
  github = "github",
  twitter = "twitter",
}

const auth = new AuthProvider({
  appID: CONFIG.APP_ID,
  network: "testnet",
  oauthCreds: [
    {
      type: LoginType.google,
      clientId: CONFIG.GOOGLE_CLIENT_ID,
      redirectUri: `${CONFIG.APP_URL}${AUTH_ROUTES.AUTH_REDIRECT}`,
    },
  ],
});

export function redirectPage() {
  AuthProvider.handleRedirectPage(CONFIG.APP_URL);
}

export function loginWithGoogle() {
  return auth.loginWithSocial(LoginType.google);
}

export function getUserInfo() {
  return auth.getUserInfo();
}

export function getPublicKey(payload: { verifier: LoginType; id: string }) {
  return auth.getPublicKey(payload);
}

export function logout() {
  return auth.logout();
}
