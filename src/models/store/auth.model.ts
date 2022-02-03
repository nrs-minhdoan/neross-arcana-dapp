import { Expose } from "class-transformer";

import { LoginType } from "../../sdks/arcanaNetwork";

export class UserInfo {
  @Expose({ name: "id" }) id!: string;

  @Expose({ name: "email" }) email!: string;

  @Expose({ name: "name" }) name!: string;

  @Expose({ name: "picture" }) avatar!: string;
}

export interface IAuthStoreState {
  loginType?: LoginType;
  userInfo?: UserInfo;
  privateKey?: string;
  loading: boolean;
  error?: string;
}
