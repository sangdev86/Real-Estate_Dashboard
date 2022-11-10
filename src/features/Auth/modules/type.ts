export interface IAuthRequestState {
  type?: string;
}

export interface IUserForm {
  name?: string;
  PhoneNumber: string;
  Password?: string;
  confirmPassword?: string;
  code?: string;
  referrerCode?: string;
}

export interface ILogin {
  PhoneNumber: string | undefined;
  Password: string | undefined;
}
export interface IresLogin {
  accessToken: string;
  refreshToken: string;
}
export interface IAuthState {
  isFetching: boolean;
  loadingForm: boolean;
  isLoggedIn: boolean;
  message: null | string | undefined;
  authForm: IUserForm;
  authFormError: any[];
}

export interface IResponseLogout<IAuthState> {
  isSuccess: boolean;
}
