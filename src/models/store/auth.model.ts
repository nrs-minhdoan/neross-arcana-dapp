export class UserInfo {}

export interface IAuthStoreState {
  token?: string;
  userInfo?: UserInfo;
}
