import { wait } from '../../../utils/time';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionsSlice, IModal, INotificationState } from './actions.slice';
import { createNotification } from './index';
import { Obj } from 'src/utils/checklObj';

const { NOTIFICATION, MODAL, LANGUAGE } = actionsSlice.actions;
interface IAction {
  type: string;
  api: any;
  time?: number;
}
export const ACTION = {
  notification: (notification: INotificationState) => (dispatch: any) =>
    dispatch(NOTIFICATION(notification)),

  modal: (modal: IModal) => (dispatch: any) => dispatch(MODAL(modal)),
  changeLanguage: (language: any) => (dispatch: any) => dispatch(LANGUAGE(language)),
  ///
  get: (action: IAction) =>
    createAsyncThunk<string, any>(action.type, async (params, thunkAPI) => {
      const { api } = action;
      try {
        // const response: any[];
        const response = await api(params);
        if (response === null) {
          return [];
        }
        // await wait(time ? time : 1);
        if (!Obj.isEmpty(response) && typeof response !== 'string') {
          return response;
        } else {
          thunkAPI.dispatch(createNotification('error', 'Lấy dữ liệu thất bại'));
          return thunkAPI.rejectWithValue({});
        }
      } catch (e: any | Error) {
        thunkAPI.dispatch(createNotification('error', 'Lấy dữ liệu thất bại'));
        return thunkAPI.rejectWithValue({});
      }
    }),
  post: (action: IAction) =>
    createAsyncThunk<string, any>(action.type, async (body, thunkAPI) => {
      try {
        // console.log('bodyAPI', body);
        const response = await action.api(body);

        await wait(50);
        // console.log('check', !Obj.isEmpty(response));
        if (!Obj.isEmpty(response) && typeof response !== 'string') {
          thunkAPI.dispatch(createNotification('success', 'Taọ dữ liệu mới thành công'));
          return response;
        } else {
          thunkAPI.dispatch(createNotification('error', 'Tạo dữ liệu mới thất bại'));
          return thunkAPI.rejectWithValue({});
        }
      } catch (e: any | Error) {
        thunkAPI.dispatch(createNotification('error', 'Tạo dữ liệu mới thất bại'));
        return thunkAPI.rejectWithValue({});
      }
    }),
  put: (action: IAction) =>
    createAsyncThunk<string, any>(action.type, async (body, thunkAPI) => {
      try {
        // console.log('bodyAPI', body);
        const response = await action.api(body);

        await wait(50);
        // console.log('check', !Obj.isEmpty(response));
        if (!Obj.isEmpty(response) && typeof response !== 'string') {
          thunkAPI.dispatch(createNotification('success', 'Cập nhật dữ liệu thành công'));
          return response;
        } else {
          thunkAPI.dispatch(createNotification('error', 'Cập nhật dữ liệu thất bại'));
          return thunkAPI.rejectWithValue({});
        }
      } catch (e: any | Error) {
        thunkAPI.dispatch(createNotification('error', 'Cập nhật dữ liệu thất bại'));
        return thunkAPI.rejectWithValue({});
      }
    }),
  del: (action: IAction) =>
    createAsyncThunk<string, any>(action.type, async (body, thunkAPI) => {
      try {
        // console.log('bodyAPI', body);
        const response = await action.api(body);

        await wait(50);
        // console.log('check', !Obj.isEmpty(response));
        if (!Obj.isEmpty(response) && typeof response !== 'string') {
          thunkAPI.dispatch(createNotification('success', 'Xóa dữ liệu thành công'));
          return response;
        } else {
          thunkAPI.dispatch(createNotification('error', 'Xóa dữ liệu thất bại'));
          return thunkAPI.rejectWithValue({});
        }
      } catch (e: any | Error) {
        thunkAPI.dispatch(createNotification('error', 'Xóa dữ liệu thất bại'));
        return thunkAPI.rejectWithValue({});
      }
    })
};

// export const createNotification = (
//   status?: undefined | 'success' | 'error',
//   message?: string | null
// ) => ACTION.notification({ status: status, message: message });

// export const createModal = (open: boolean, data?: any) => ACTION.modal({ open: open, data: data });
