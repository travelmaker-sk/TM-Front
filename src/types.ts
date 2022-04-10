export type ChangeFieldReqType = {
  form: string;
  key: string;
  value: string;
};

export type RegisterReqType = {
  nickname: string;
  username: string;
  password: string;
};

export type LoginReqType = {
  username: string;
  password: string;
};

export type AuthState = {
  register: object;
  login: object;
  auth: any | null;
  authError: string | null;
};

export type UserState = {
  user: any | null;
  checkError: string | null;
};

export type RootState = {
  auth: AuthState;
  loading: boolean;
  user: UserState;
};
