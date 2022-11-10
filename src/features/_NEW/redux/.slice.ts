import { TYPE_ACCOUNTS } from '../../Accounts/redux/accounts.async-thunk';
import { ACTION } from '../../../components/Actions/reducer/actions';

import { createSlice } from '@reduxjs/toolkit';

import { delay } from 'src/utils/time';

export const accountsSlice = createSlice({
  name: 'ACCOUNTS',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    const { get } = ACTION;
    const { getAllUsers, changeProfileByAdmin, getKYC } = TYPE_ACCOUNTS;
    builder
      //User
      .addCase(get(getAllUsers).pending, (state) => {
        delay(0);
      })
      .addCase(get(getAllUsers).fulfilled, (state, action: any) => {})
      .addCase(get(getAllUsers).rejected, (state) => {})
      .addCase(get(changeProfileByAdmin).pending, (state: any) => {})
      .addCase(get(changeProfileByAdmin).fulfilled, (state: any, action: any) => {
        state.isFetching = false;
      })
      .addCase(get(changeProfileByAdmin).rejected, (state: any) => {
        state.isFetching = false;
      });

    //KYC
  }
});
