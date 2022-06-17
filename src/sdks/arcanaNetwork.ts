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
      redirectUri: `${CONFIG.APP_URL}${AUTH_ROUTES.AUTH_REDIRECT}`,
    });
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  initializeStorage = async () => {
    const userInfo = this.auth.getUserInfo();
    if (!this.storage) {
      this.storage = new StorageProvider({
        appId: Number(CONFIG.APP_ID),
        privateKey: userInfo.privateKey,
        email: userInfo.userInfo.email || "",
        gateway: "",
        debug: "",
      });
      await this.storage.login();
    }
  };

  redirectPage = () => {
    AuthProvider.handleRedirectPage(CONFIG.APP_URL);
  };

  loginWithGoogle = () => {
    return this.auth.loginWithSocial(LoginType.google);
  };

  getUserInfo = () => {
    const userInfo = this.auth.getUserInfo();
    return userInfo;
  };

  getPublicKeyFromAuth = async (payload: {
    verifier: LoginType;
    username: string;
  }) => {
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
    return this.keystore.getPrivateKey({
      verifier: payload.verifier,
      id: payload.username,
      idToken: payload.token,
    });
  };

  getWalletAddressFromPublicKey = (publicKey: string) => {
    const walletAddress = `0x${keccak256(publicKey).slice(64 - 38)}`;
    return walletAddress;
  };

  getWalletAddressFromPrivateKey = (privateKey: string) => {
    const key = ec.keyFromPrivate(privateKey, "hex");
    const publicKey = key.getPublic().encode("hex", true).slice(2);
    const walletAddress = `0x${keccak256(publicKey).slice(64 - 38)}`;
    return walletAddress;
  };

  getUploadLimit = async () => {
    await this.initializeStorage();
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
    await this.initializeStorage();
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
    await this.initializeStorage();
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
    await this.initializeStorage();
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
    await this.initializeStorage();
    return (this.storage as StorageProvider).myFiles();
  };

  getSharedFilesWithMe = async () => {
    await this.initializeStorage();
    return (this.storage as StorageProvider).sharedFiles();
  };

  shareFile = async (payload: {
    id: string;
    publicKey: string;
    validity: number;
  }) => {
    await this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.share([payload.id], [payload.publicKey], [payload.validity]);
  };

  getSharedAddresses = async (id: string) => {
    await this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.getSharedUsers(id);
  };

  revokeFile = async (payload: { id: string; address: string }) => {
    await this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.revoke(payload.id, payload.address);
  };

  deleteFile = async (id: string) => {
    await this.initializeStorage();
    const access = await (this.storage as StorageProvider).getAccess();
    return access.deleteFile(id);
  };

  logout = () => {
    this.storage = undefined;
    return this.auth.logout();
  };
}

const arcanaNetworkSDK = new ArcanaNetworkSDK();

export default arcanaNetworkSDK;
