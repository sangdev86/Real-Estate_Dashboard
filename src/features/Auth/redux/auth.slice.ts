import _ from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../modules/type';
import { AUTH } from './auth.async-thunk';
import { initialState } from './auth.init-state';

export const delay = async () => {
  return new Promise(function (resolve) {
    setTimeout(resolve, 500);
  });
};
export const authSlice = createSlice({
  name: 'AUTH',
  initialState: initialState,
  reducers: {
    changeState: (state: IAuthState, action: PayloadAction<any>) => {
      // console.log('payload', action.payload);
      for (const key in action.payload) {
        _.set(state, key, action.payload[key as keyof any]);
      }
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AUTH.loginUser.pending, (state) => {
        state.loadingForm = true;
        delay();
      })
      .addCase(AUTH.loginUser.fulfilled, (state, action) => {
        // console.log('action', action);
        state.authForm = {
          PhoneNumber: action.meta.arg.PhoneNumber,
          Password: ''
          // tokenFCM: action.meta.arg.tokenFCM
        };
        state.loadingForm = false;
        state.isLoggedIn = true;
      })
      .addCase(AUTH.loginUser.rejected, (state, action) => {
        console.log('action failure :>> ', action);
        state.message = action.payload?.message;
        state.loadingForm = false;
        if (action.payload?.isResponseError) {
          state.message = action.payload.error;
        } else {
          if (typeof action.payload === 'object') {
            for (const key in action.payload) {
              state = _.set(
                state,
                key.split('.'),
                (action.payload as IAuthState)[key as keyof IAuthState]
              );
            }
          }
        }
      });

    // reduce logout
    builder.addCase(AUTH.logoutUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(AUTH.logoutUser.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.isFetching = false;
    });
  }
});
