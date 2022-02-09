import { Expose } from "class-transformer";

export class MyFile {
  @Expose({ name: "did" }) id!: string;

  @Expose({ name: "uploaded_on" }) lastModified!: string;

  @Expose({ name: "size" }) size!: number;
}

export interface IFileStoreState {
  myFiles: Array<MyFile>;
  loading: boolean;
}
