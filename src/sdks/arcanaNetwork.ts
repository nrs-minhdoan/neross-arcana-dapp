import { KeyReconstructor } from "@arcana/keystore";
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

export class ArcanaNetworkSDK {
  keystore: KeyReconstructor;
  auth: AuthProvider;

  constructor() {
    this.keystore = new KeyReconstructor({
      appID: CONFIG.APP_ID,
      network: "testnet",
    });
    this.auth = new AuthProvider({
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
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  redirectPage = () => {
    AuthProvider.handleRedirectPage(CONFIG.APP_URL);
  };

  loginWithGoogle = () => {
    return this.auth.loginWithSocial(LoginType.google);
  };

  getUserInfo = () => {
    return this.auth.getUserInfo();
  };

  getPublicKeyFromAuth = (payload: {
    verifier: LoginType;
    username: string;
  }) => {
    return this.auth.getPublicKey({
      verifier: payload.verifier,
      id: payload.username,
    });
  };

  getPublicKeyFromKeystore = (payload: {
    verifier: LoginType;
    username: string;
  }) => {
    return this.keystore.getPublicKey({
      verifier: payload.verifier,
      id: payload.username,
    });
  };

  getPrivateKey = (payload: {
    verifier: LoginType;
    username: string;
    token: string;
  }) => {
    return this.keystore.getPrivateKey({
      verifier: payload.verifier,
      id: payload.username,
      idToken: payload.token,
    });
  };

  logout = () => {
    return this.auth.logout();
  };
}

const arcanaNetworkSDK = new ArcanaNetworkSDK();

export default arcanaNetworkSDK;
