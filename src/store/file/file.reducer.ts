import { createReducer } from "typesafe-actions";

import { IFileStoreState } from "../../models/store/file.model";
import { destroySession } from "../auth/auth.action";
import {
  getMyFiles,
  uploadFile,
  downloadFile,
  shareFile,
  deleteFile,
} from "./file.action";

const initialState: IFileStoreState = {
  myFiles: [],
  loading: false,
};

const fileReducer = createReducer<IFileStoreState>(initialState)
  .handleAction(getMyFiles.request, (state) => {
    return { ...state, myFiles: [], loading: true };
  })
  .handleAction(getMyFiles.success, (state, { payload }) => {
    return { ...state, myFiles: payload, loading: false };
  })
  .handleAction(getMyFiles.failure, (state) => {
    return { ...state, loading: false };
  })
  .handleAction(uploadFile.request, (state) => {
    return state;
  })
  .handleAction(uploadFile.success, (state) => {
    return state;
  })
  .handleAction(uploadFile.failure, (state) => {
    return state;
  })
  .handleAction(downloadFile.request, (state) => {
    return state;
  })
  .handleAction(downloadFile.success, (state) => {
    return state;
  })
  .handleAction(downloadFile.failure, (state) => {
    return state;
  })
  .handleAction(shareFile.request, (state) => {
    return state;
  })
  .handleAction(shareFile.success, (state) => {
    return state;
  })
  .handleAction(shareFile.failure, (state) => {
    return state;
  })
  .handleAction(deleteFile.request, (state) => {
    return state;
  })
  .handleAction(deleteFile.success, (state) => {
    return state;
  })
  .handleAction(deleteFile.failure, (state) => {
    return state;
  })
  .handleAction(destroySession, () => {
    return initialState;
  });
export default fileReducer;
