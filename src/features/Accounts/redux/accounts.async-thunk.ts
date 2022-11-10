import { createNotification } from '../../../components/Actions/reducer/index';
import { getLan } from 'src/assets/languages';
import { createAsyncThunk } from '@reduxjs/toolkit';
import accountsAPI from '../modules/accounts.api';

export const TYPE_ACCOUNTS = {
  getAllUsers: {
    type: 'ACCOUNTS.getAllUser',
    api: accountsAPI.getAllUsers
  },
  changeProfile: {
    type: 'ACCOUNTS.changeProfile',
    api: accountsAPI.changeProfile
  },
  changeProfileByAdmin: {
    type: 'ACCOUNTS.changeProfileByAdmin',
    api: accountsAPI.changeProfileByAdmin
  },
  resetPasswordByAdmin: {
    type: 'ACCOUNTS.resetPasswordByAdmin',
    api: accountsAPI.resetPasswordsByAdmin
  },
  addUserToGroupName: {
    type: 'ACCOUNTS.addUserToGroupName',
    api: accountsAPI.addUserToGroupName
  },
  //KYC
  createKYC: {
    type: 'ACCOUNTS.createKYC',
    api: accountsAPI.createKYC
  },
  updateKYC: {
    type: 'ACCOUNTS.updateKYC',
    api: accountsAPI.updateKYC
  },
  deleteKYC: {
    type: 'ACCOUNTS.deleteKYC',
    api: accountsAPI.deleteKYC
  },
  verifyKYC: {
    type: 'ACCOUNTS.verifyKYC',
    api: accountsAPI.verifyKYC
  },
  getKYC: {
    type: 'ACCOUNTS.getKYC',
    api: accountsAPI.getKYC
  }
};

export const ACCOUNTS = {
  logoutUser: createAsyncThunk<any, any>('ACCOUNTS.logoutUser', ({}, thunkAPI) => {
    try {
      const isSuccess = true;
      // Ở đây call api logout

      // Xong kiểm tra api thành công thì

      // rồi vô reducre set variable isLogged = false
      if (isSuccess) {
        thunkAPI.dispatch(createNotification('success', getLan().notification.logout_successful));
        return { isSuccess: true };
      } else {
        return thunkAPI.rejectWithValue({ isSuccess: false });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: 'Đăng xuat thất bại',
        isResponseError: true
      });
    }
  })
};
