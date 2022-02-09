import { createAsyncAction } from "typesafe-actions";

import { MyFile } from "../../models/store/file.model";

export const getMyFiles = createAsyncAction(
  "file/GET_MY_FILES",
  "file/GET_MY_FILES_SUCCEEDED",
  "file/GET_MY_FILES_FAILED"
)<void, Array<MyFile>, void>();

export const uploadFile = createAsyncAction(
  "file/UPLOAD_FILE",
  "file/UPLOAD_FILE_SUCCEEDED",
  "file/UPLOAD_FILE_FAILED"
)<
  {
    file: File;
    callbacks: {
      onProgress: (bytesUploaded: number, bytesTotal: number) => void;
      onSuccess: () => void;
      onError: () => void;
    };
  },
  void,
  void
>();

export const downloadFile = createAsyncAction(
  "file/DOWNLOAD_FILE",
  "file/DOWNLOAD_FILE_SUCCEEDED",
  "file/DOWNLOAD_FILE_FAILED"
)<
  {
    id: string;
    callbacks: {
      onProgress: (
        bytesDownloaded: number,
        bytesTotal: number
      ) => Promise<void>;
      onSuccess: () => Promise<void>;
      onError: () => void;
    };
  },
  void,
  void
>();
