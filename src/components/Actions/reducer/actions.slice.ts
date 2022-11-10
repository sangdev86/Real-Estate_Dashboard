import { localStorageLanguage } from '../../../config/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface INotificationState {
  open?: boolean;
  status: undefined | 'success' | 'error';
  message?: any;
  ms: number;
}
export interface IModal {
  open: boolean;
  data?: any;
}
export interface IActionsState {
  notification: INotificationState;
  modal: IModal;
  currentLanguage: string;
}
const currentLanguage = localStorageLanguage.get();

const actionsState: IActionsState = {
  notification: { open: false, status: undefined, message: null, ms: 0 },
  modal: { open: false, data: {} },
  currentLanguage: currentLanguage === null ? 'vie' : currentLanguage
};
export const actionsSlice = createSlice({
  name: 'ACTION',
  initialState: actionsState,
  reducers: {
    NOTIFICATION: (state: IActionsState, action: PayloadAction<INotificationState>) => {
      const { status, message, ms } = action.payload;

      if (message && status) {
        state.notification = { open: true, status: status, message: message, ms: ms };
      } else {
        state.notification.open = false;
      }
    },
    MODAL: (state: IActionsState, action: PayloadAction<IModal>) => {
      state.modal = action.payload;
    },
    LANGUAGE: (state: any, action: any) => {
      state.currentLanguage = action.payload;
    }
  }
});
