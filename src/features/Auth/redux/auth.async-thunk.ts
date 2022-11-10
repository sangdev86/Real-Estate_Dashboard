import { createNotification } from '../../../components/Actions/reducer/index';
import SETTING from 'src/config/setting';
import { getLan } from 'src/assets/languages';
// import { createNotification } from './../../../components/Actions/reducer/actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { removeUser, saveUser } from 'src/config/storage';
import authAPI, { removeToken, setToken } from '../modules/auth.api';
import { IUserForm } from '../modules/type';

export const Types = {
  loginUser: 'AUTH.loginUser',
  logoutUser: 'AUTH.logoutUser'
};
const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const AUTH = {
  loginUser: createAsyncThunk<string, IUserForm, { rejectValue: any }>(
    Types.loginUser,
    async ({ PhoneNumber, Password }, thunkAPI) => {
      try {
        const response = await authAPI.login({ PhoneNumber, Password });
        await wait(500);
        console.log('data', response);
        if (!_.isEmpty(response) || response.UserId === SETTING.SADMIN) {
          // console.log('hihi');
          saveUser(response);
          setToken(response?.accessToken);
          thunkAPI.dispatch(createNotification('success', getLan().notification.login_successful));
          return { ...response };
        } else {
          thunkAPI.dispatch(createNotification('error', getLan().notification.login_failed));
          return thunkAPI.rejectWithValue({});
        }
      } catch (e: any | Error) {
        return thunkAPI.rejectWithValue({});
      }
    }
  ),
  logoutUser: createAsyncThunk(Types.logoutUser, async (__, thunkAPI) => {
    try {
      const isSuccess = true;
      // Ở đây call api logout
      // Xong kiểm tra api thành công thì
      removeUser();
      removeToken();

      // rồi vô reducre set variable isLogged = false
      if (isSuccess) {
        thunkAPI.dispatch(createNotification('success', getLan().notification.logout_successful));
        return { isSuccess: true };
      } else {
        thunkAPI.dispatch(createNotification('error', getLan().notification.logout_failed));
        return thunkAPI.rejectWithValue({ isSuccess: false });
      }
    } catch (error) {
      thunkAPI.dispatch(createNotification('error', getLan().notification.logout_failed));

      return thunkAPI.rejectWithValue({
        error: 'Đăng xuất thất bại',
        isResponseError: true
      });
    }
  })
};
