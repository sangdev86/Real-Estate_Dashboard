import { TYPE_ACCOUNTS } from 'src/features/Accounts/redux/accounts.async-thunk';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './acounts.init-state';
import { delay } from 'src/utils/time';
import { ACTION } from 'src/components/Actions/reducer/actions';

export const accountsSlice = createSlice({
  name: 'ACCOUNTS',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { get } = ACTION;
    const { getAllUsers, changeProfileByAdmin, getKYC } = TYPE_ACCOUNTS;
    builder
      //User
      .addCase(get(getAllUsers).pending, (state) => {
        state.isFetching = true;
        delay(0);
      })
      .addCase(get(getAllUsers).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allUsers = action.payload;
      })
      .addCase(get(getAllUsers).rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(get(changeProfileByAdmin).pending, (state: any) => {
        state.isFetching = true;
      })
      .addCase(get(changeProfileByAdmin).fulfilled, (state: any) => {
        state.isFetching = false;
      })
      .addCase(get(changeProfileByAdmin).rejected, (state: any) => {
        state.isFetching = false;
      })

      //KYC

      .addCase(get(getKYC).pending, (state) => {
        state.isFetching = true;
        delay(0);
      })
      .addCase(get(getKYC).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.KYC = action.payload;
      })
      .addCase(get(getKYC).rejected, (state) => {
        state.isFetching = false;
      });
  }
});
