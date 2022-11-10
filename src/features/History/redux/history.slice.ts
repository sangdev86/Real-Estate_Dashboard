import { TYPE_HISTORY } from './history.async-thunk';
import { ACTION } from '../../../components/Actions/reducer/actions';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './history.init-state';

export const historySlice = createSlice({
  name: 'HISTORYS',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { get } = ACTION;

    builder
      //User
      .addCase(get(TYPE_HISTORY.getAllPaymentsByAdmin).pending, () => {})
      .addCase(get(TYPE_HISTORY.getAllPaymentsByAdmin).fulfilled, (state, action: any) => {
        state.allPayments = action.payload;
      })
      .addCase(get(TYPE_HISTORY.getAllPaymentsByAdmin).rejected, () => {})
      .addCase(get(TYPE_HISTORY.getAllInvoicesByAdmin).pending, () => {})
      .addCase(get(TYPE_HISTORY.getAllInvoicesByAdmin).fulfilled, (state, action: any) => {
        state.allInvoices = action.payload;
      })
      .addCase(get(TYPE_HISTORY.getAllInvoicesByAdmin).rejected, () => {});

    //KYC
  }
});
