import React from 'react';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { useDispatch, useSelector } from 'react-redux';
// import { createNotification } from '../reducer/actions';
import { Snackbar } from '@mui/material';
import { RootState } from 'src/app/root-reducer';
import { createNotification } from '../reducer';

export const Notification: React.FC<any> = () => {
  const notification = useSelector((state: RootState) => state.actions.notification);

  const { open, status, message, ms } = notification;

  const dispatch = useDispatch();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={ms === 0 ? 3000 : ms}
      onClose={() => dispatch(createNotification())}
    >
      <Alert
        icon={
          status === 'success' ? (
            <CheckCircleIcon fontSize="inherit" />
          ) : (
            <ErrorIcon fontSize="inherit" />
          )
        }
        color={status}
      >
        <strong>{message}</strong>
      </Alert>
    </Snackbar>
  );
};
