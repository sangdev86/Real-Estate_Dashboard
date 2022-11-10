import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { AUTH } from '../../redux/auth.async-thunk';
import Box from '@mui/material/Box';
import { getLan } from 'src/assets/languages';
import { Form, IForm } from 'src/components/Form/Form';
import { LoginDto } from '../../redux/dto';

export const Login: React.FC = () => {
  const {
    authForm: { PhoneNumber, Password }
  } = useSelector((state: RootState) => state.auth);

  const form: IForm = {
    body: { PhoneNumber, Password },

    dto: LoginDto,
    typeForm: 'post',
    post: {
      tittleForm: getLan().text.login,
      button: getLan().text.login,
      asyncActionForm: [
        {
          bodyAPI: { PhoneNumber: 'text', Password: 'password' },
          action: AUTH.loginUser
        }
      ]
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: '250px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '30px 35px',
          borderRadius: '8px',
          boxShadow: 'shadows'
        }}
      >
        <Form {...form} />
      </Box>
    </Box>
  );
};
