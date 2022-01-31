import { Expose } from "class-transformer";

export class UserInfo {
  @Expose({ name: "googleId" }) id!: string;

  @Expose({ name: "email" }) email!: string;

  @Expose({ name: "name" }) name!: string;

  @Expose({ name: "imageUrl" }) avatar!: string;
}

export interface IAuthStoreState {
  token?: string;
  userInfo?: UserInfo;
  loading: boolean;
}
