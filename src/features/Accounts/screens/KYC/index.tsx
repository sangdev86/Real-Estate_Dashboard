import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { IForm } from 'src/components/Form/Form';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_ACCOUNTS } from '../../redux/accounts.async-thunk';

const ListKYC: React.FC = () => {
  const accounts = useSelector((state: RootState) => state.accounts);

  const { KYC, currentKYC } = accounts;
  const { get, put, post, del } = ACTION;

  const modalForm: IForm = {
    body: currentKYC, //undefined
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm thông tin KYC',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: {
            Type: 'text',
            No: 'text',
            DateOfBirth: 'date',
            DateOfIssue: 'date',
            PlaceOfBirth: 'text',
            PlaceOfIssue: 'text',
            Nationality: 'text',
            DateOfExpiry: 'date',
            FullName: 'text',
            Sex: 'text'
          },
          action: post(TYPE_ACCOUNTS.createKYC)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật thông tin KYC',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: {
            Type: 'text',
            No: 'text',
            DateOfBirth: 'date',
            DateOfIssue: 'date',
            PlaceOfBirth: 'text',
            PlaceOfIssue: 'text',
            Nationality: 'text',
            DateOfExpiry: 'date',
            FullName: 'text',
            Sex: 'text'
          },
          action: put(TYPE_ACCOUNTS.updateKYC)
        }
      ]
    }
  };
  const props = (): ITable => ({
    body: KYC,
    currentBody: currentKYC,
    widthCell: [50, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 300, 100, 100],
    subAction: [],
    mainAction: get(TYPE_ACCOUNTS.getKYC),
    modalForm,
    deleteAction: { params: 'KYCId', action: del(TYPE_ACCOUNTS.deleteKYC) }
  });
  return <TableCS {...props()} />;
};

export default ListKYC;
