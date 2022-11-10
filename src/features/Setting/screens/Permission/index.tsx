import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { IForm } from 'src/components/Form/Form';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_SETTING } from '../../redux/setting.action';

const Permission: React.FC = () => {
  const allPermissions = useSelector((state: RootState) => state.settings.allPermissions);
  const currentPermission = useSelector((state: RootState) => state.settings.currentPermission);

  const { get, post, put, del } = ACTION;
  const modalForm: IForm = {
    body: currentPermission,
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm phân quyền',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: {
            PermissionName: 'text',
            PermissionDescription: 'text'
          },
          action: post(TYPE_SETTING.createPermission)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật phân quyền',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: {
            PermissionId: '',
            PermissionName: 'text',
            PermissionDescription: 'text'
          },
          action: put(TYPE_SETTING.updatePermission)
        }
      ]
    }
  };
  const propsTable = (): ITable => ({
    body: allPermissions,
    currentBody: currentPermission,
    widthCell: [100, 100, 100],
    mainAction: get(TYPE_SETTING.getAllPermissions),
    subAction: [],
    deleteAction: { params: 'PermissionId', action: del(TYPE_SETTING.deletePermission) },
    modalForm: modalForm
  });
  return <TableCS {...propsTable()} />;
};

export default Permission;
