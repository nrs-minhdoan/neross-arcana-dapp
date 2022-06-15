import { Expose } from "class-transformer";

export class MyFile {
  @Expose({ name: "did" }) id!: string;

  @Expose({ name: "uploaded_on" }) lastModified!: string;

  @Expose({ name: "size" }) size!: number;
}

export interface IFileStoreState {
  myFiles: Array<MyFile>;
  sharedWithMeFiles: Array<MyFile>;
  sharedAddresses: Array<string>;
  sharedAddressLoading: boolean;
  loading: boolean;
}
