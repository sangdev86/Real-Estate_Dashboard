import { ACTION } from './actions';

export const createNotification = (
  status?: undefined | 'success' | 'error',
  message?: string | null,
  ms = 0
) => ACTION.notification({ status: status, message: message, ms: ms });

export const createModal = (open: boolean, data?: any) => ACTION.modal({ open: open, data: data });
