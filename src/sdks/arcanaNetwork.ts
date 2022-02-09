import { KeyReconstructor } from "@arcana/keystore";
import { AuthProvider } from "@arcana/auth";
import { StorageProvider } from "@arcana/storage/dist/standalone/storage.umd";
import Buffer from "buffer";
import { ec as EC } from "elliptic";
import { keccak256 } from "web3-utils";

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

global.Buffer = global.Buffer || Buffer.Buffer;

const ec = new EC("secp256k1");

export class ArcanaNetworkSDK {
  keystore: KeyReconstructor;
  auth: AuthProvider;
  storage?: StorageProvider;

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

  initializeKeystore = () => {
    if (!this.keystore) {
      this.keystore = new KeyReconstructor({
        appID: CONFIG.APP_ID,
        network: "testnet",
      });
    }
  };

  initializeAuth = () => {
    if (!this.auth) {
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
  };

  initializeStorage = () => {
    if (!this.storage) {
      this.initializeAuth();
      const userInfo = this.auth.getUserInfo();
      this.storage = new StorageProvider({
        appId: Number(CONFIG.APP_ID),
        privateKey: userInfo.privateKey,
        email: userInfo.userInfo.email || "",
        gateway: "",
        debug: "",
      });
    }
  };

  redirectPage = () => {
    AuthProvider.handleRedirectPage(CONFIG.APP_URL);
  };

  loginWithGoogle = () => {
    this.initializeAuth();
    return this.auth.loginWithSocial(LoginType.google);
  };

  getUserInfo = () => {
    this.initializeAuth();
    const userInfo = this.auth.getUserInfo();
    return userInfo;
  };

  getPublicKeyFromAuth = async (payload: {
    verifier: LoginType;
    username: string;
  }) => {
    this.initializeAuth();
    const { X, Y } = await this.auth.getPublicKey({
      verifier: payload.verifier,
      id: payload.username,
    });
    return "04" + X.padStart(64, "0") + Y.padStart(64, "0");
  };

  getPublicKeyFromKeystore = async (payload: {
    verifier: LoginType;
    username: string;
  }) => {
    this.initializeKeystore();
    const { X, Y } = await this.keystore.getPublicKey({
      verifier: payload.verifier,
      id: payload.username,
    });
    return "04" + X.padStart(64, "0") + Y.padStart(64, "0");
  };

  getPrivateKey = (payload: {
    verifier: LoginType;
    username: string;
    token: string;
  }) => {
    this.initializeKeystore();
    return this.keystore.getPrivateKey({
      verifier: payload.verifier,
      id: payload.username,
      idToken: payload.token,
    });
  };

  getWalletAddressFromPrivateKey = (privateKey: string) => {
    const key = ec.keyFromPrivate(privateKey, "hex");
    const publicKey = key.getPublic().encode("hex", true).slice(2);
    const walletAddress = `0x${keccak256(publicKey).slice(64 - 38)}`;
    return walletAddress;
  };

  getUploadLimit = async () => {
    this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.getUploadLimit();
  };

  uploadFile = async (
    file: File,
    callbacks?: {
      onProgress?: (bytesUploaded: number, bytesTotal: number) => void;
      onSuccess?: () => void;
      onError?: () => void;
    }
  ) => {
    this.initializeStorage();
    const uploader = await (this.storage as StorageProvider).getUploader();
    if (callbacks?.onProgress) {
      uploader.onProgress = callbacks.onProgress;
    }
    if (callbacks?.onSuccess) {
      uploader.onSuccess = callbacks.onSuccess;
    }
    if (callbacks?.onError) {
      uploader.onError = callbacks.onError;
    }
    return uploader.upload(file);
  };

  getDownloadLimit = async () => {
    this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.getDownloadLimit();
  };

  downloadFile = async (
    id: string,
    callbacks: {
      onProgress?: (
        bytesDownloaded: number,
        bytesTotal: number
      ) => Promise<void>;
      onSuccess?: () => Promise<void>;
    }
  ) => {
    this.initializeStorage();
    const downloader = await (this.storage as StorageProvider).getDownloader();
    if (callbacks?.onProgress) {
      downloader.onProgress = callbacks.onProgress;
    }
    if (callbacks?.onSuccess) {
      downloader.onSuccess = callbacks.onSuccess;
    }
    return downloader.download(id);
  };

  getUploadedFilesByMe = async () => {
    this.initializeStorage();
    return (this.storage as StorageProvider).myFiles();
  };

  revokeFile = async (payload: { id: string; address: string }) => {
    this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.revoke(payload.id, payload.address);
  };

  getSharedFilesWithMe = async () => {
    this.initializeStorage();
    return (this.storage as StorageProvider).sharedFiles();
  };

  shareFile = async (payload: {
    id: string;
    publicKey: string;
    validity: number;
  }) => {
    this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.share([payload.id], [payload.publicKey], [payload.validity]);
  };

  logout = () => {
    return this.auth.logout();
  };
}

const arcanaNetworkSDK = new ArcanaNetworkSDK();

export default arcanaNetworkSDK;
