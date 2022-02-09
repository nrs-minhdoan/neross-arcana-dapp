import { createReducer } from "typesafe-actions";

import { IFileStoreState } from "../../models/store/file.model";
import { downloadFile, getMyFiles, uploadFile } from "./file.action";

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
  });
export default fileReducer;
