import { createAsyncThunk } from '@reduxjs/toolkit';
export const HOME = {
  ff: createAsyncThunk<any, any>('hihi', ({}, thunkAPI) => {
    alert('hihi');
  })
};
