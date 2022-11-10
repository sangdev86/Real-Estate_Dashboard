import { useSelector } from 'react-redux';
import { TYPE_ACCOUNTS } from '../../redux/accounts.async-thunk';
import { RootState } from 'src/app/root-reducer';
import TableCS, { ITable } from 'src/components/Table';
import { IForm } from 'src/components/Form/Form';
import { dtoListAccounts } from './dto';
// import React from 'react';

import { TYPE_SETTING } from 'src/features/Setting/redux/setting.action';
import { ACTION } from 'src/components/Actions/reducer/actions';

export default function ListAccounts() {
  const currentUser = useSelector((state: RootState) => state.accounts.currentUser);
  const allUsers = useSelector((state: RootState) => state.accounts.allUsers);

  const { get, put } = ACTION;

  const modalForm: IForm = {
    body: currentUser,
    dto: dtoListAccounts,
    typeForm: 'add',
    add: {
      tittleForm: 'Back End chưa có chức năng tạo tài khoản cho admin',
      button: 'Tạo',
      asyncActionForm: []
    },
    update: {
      tittleForm: 'Cập nhật tài khoản',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: { UserId: '', Name: 'text', Birth: 'date', Sex: 'select', IdCard: 'text' },
          action: put(TYPE_ACCOUNTS.changeProfileByAdmin)
        },
        { bodyAPI: { UserId: '' }, action: put(TYPE_ACCOUNTS.resetPasswordByAdmin) },
        {
          bodyAPI: { UserId: '', GroupNameId: 'select' },
          action: put(TYPE_ACCOUNTS.addUserToGroupName)
        }
      ]
    }
  };

  const props = (): ITable => ({
    body: allUsers,
    currentBody: currentUser,
    sizeWH: ['100%', '100%'],
    widthCell: {
      0: 0,
      1: 100,
      2: 100,
      3: 100,
      4: 200
    },
    subAction: [get(TYPE_SETTING.getAllGroupsNames), get(TYPE_SETTING.getAllAddressOfCurrentUser)],
    mainAction: get(TYPE_ACCOUNTS.getAllUsers),
    resetAction: { params: 'UserId', action: put(TYPE_ACCOUNTS.resetPasswordByAdmin) },
    modalForm: modalForm
  });

  return <TableCS {...props()} />;
}
