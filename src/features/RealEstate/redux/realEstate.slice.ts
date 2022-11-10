import { createSlice } from '@reduxjs/toolkit';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { delay } from 'src/utils/time';
import { TYPE_REALESTATE } from './realEstate.action';

import { initialState } from './realEstate.init-state';

export const realEstatesSlice = createSlice({
  name: 'REALESTATE',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { get } = ACTION;
    const { getAllAttributes, getAllParentAttributes, getAllHomes, getAllSellPosts } =
      TYPE_REALESTATE;
    builder
      //Attributes
      .addCase(get(getAllAttributes).pending, (state) => {
        state.isFetching = true;
        delay(50);
      })
      .addCase(get(getAllAttributes).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allAttributes = action.payload;
      })
      .addCase(get(getAllAttributes).rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(get(getAllParentAttributes).pending, (state) => {
        state.isFetching = true;
      })
      .addCase(get(getAllParentAttributes).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allParentAttributes = action.payload;
      })
      .addCase(get(getAllParentAttributes).rejected, (state) => {
        state.isFetching = false;
      })

      //Home
      .addCase(get(getAllHomes).pending, (state) => {
        state.isFetching = true;
        delay(50);
      })
      .addCase(get(getAllHomes).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allHome = action.payload;
      })
      .addCase(get(getAllHomes).rejected, (state) => {
        state.isFetching = false;
      })

      //Sell
      .addCase(get(getAllSellPosts).pending, (state) => {
        state.isFetching = true;
        delay(50);
      })
      .addCase(get(getAllSellPosts).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allSellPosts = action.payload;
      })
      .addCase(get(getAllSellPosts).rejected, (state) => {
        state.isFetching = false;
      });
  }
});
