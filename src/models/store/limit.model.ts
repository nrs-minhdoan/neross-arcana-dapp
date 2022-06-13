export interface ILimitStatus {
  used: number;
  limit?: number;
}

export interface ILimitStoreState {
  storage: ILimitStatus;
  bandwidth: ILimitStatus;
}
