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

  redirectPage = () => {
    AuthProvider.handleRedirectPage(CONFIG.APP_URL);
  };

  loginWithGoogle = () => {
    return this.auth.loginWithSocial(LoginType.google);
  };

  getUserInfo = () => {
    const result = this.auth.getUserInfo();
    this.storage = new StorageProvider({
      appId: Number(CONFIG.APP_ID),
      privateKey: result.privateKey,
      email: result.userInfo.email || "",
      gateway: "",
      debug: "",
    });
    return result;
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

  getPublicKey = (payload: { X: string; Y: string }) => {
    return "04" + payload.X.padStart(64, "0") + payload.Y.padStart(64, "0");
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

  getWalletAddressFromPrivateKey(privateKey: string) {
    const key = ec.keyFromPrivate(privateKey, "hex");
    const publicKey = key.getPublic().encode("hex", true).slice(2);
    const walletAddress = `0x${keccak256(publicKey).slice(64 - 38)}`;
    return walletAddress;
  }

  async getUploadLimit() {
    const access = await (this.storage as StorageProvider).getAccess();
    return access.getUploadLimit();
  }

  async uploadFile(
    file: File,
    callbacks?: {
      onProgress?: (bytesUploaded: number, bytesTotal: number) => void;
      onSuccess?: () => void;
      onError?: () => void;
    }
  ) {
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
  }

  async getDownloadLimit() {
    const access = await (this.storage as StorageProvider).getAccess();
    return access.getDownloadLimit();
  }

  async downloadFile(
    file: File,
    callbacks: {
      onProgress?: (
        bytesDownloaded: number,
        bytesTotal: number
      ) => Promise<void>;
      onSuccess?: () => Promise<void>;
    }
  ) {
    const downloader = await (this.storage as StorageProvider).getDownloader();
    if (callbacks?.onProgress) {
      downloader.onProgress = callbacks.onProgress;
    }
    if (callbacks?.onSuccess) {
      downloader.onSuccess = callbacks.onSuccess;
    }
    return downloader.download(file);
  }

  async getSharedFilesWithMe() {
    return (this.storage as StorageProvider).sharedFiles();
  }

  async shareFile(payload: {
    id: string;
    publicKey: string;
    validity: number;
  }) {
    const access = await (this.storage as StorageProvider).getAccess();
    return access.share([payload.id], [payload.publicKey], [payload.validity]);
  }

  async getUploadedFilesByMe() {
    return (this.storage as StorageProvider).myFiles();
  }

  async revokeFile(payload: { id: string; address: string }) {
    const access = await (this.storage as StorageProvider).getAccess();
    return access.revoke(payload.id, payload.address);
  }

  logout = () => {
    return this.auth.logout();
  };
}

const arcanaNetworkSDK = new ArcanaNetworkSDK();

export default arcanaNetworkSDK;
