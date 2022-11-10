import { IUserForm } from '../modules/type';
import { getUser } from 'src/config/storage';
import { IAuthState } from '../modules/type';
import { stateError } from 'src/config/stateError';

const userForm: IUserForm = {
  name: '',
  PhoneNumber: '',
  Password: '',
  confirmPassword: '',
  code: '',
  referrerCode: ''
};

export const initialState: IAuthState = {
  isFetching: false,
  loadingForm: false,
  isLoggedIn: getUser()?.AccessToken ? true : false,
  message: null,
  authForm: userForm,
  authFormError: stateError(userForm)
};
