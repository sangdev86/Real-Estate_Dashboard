import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { IForm } from 'src/components/Form/Form';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_SETTING } from '../../redux/setting.action';
const Role: React.FC = () => {
  const allGroupNames = useSelector((state: RootState) => state.settings.allGroupNames);
  const currentGroupName = useSelector((state: RootState) => state.settings.currentGroupName);
  const { get, post, put, del } = ACTION;

  const formRole: IForm = {
    body: currentGroupName,
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm vai trò',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: { GroupNameName: 'text', GroupNameDescription: 'text' },
          action: post(TYPE_SETTING.createGroupName)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật vai trò',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: {
            GroupNameId: '',
            GroupNameName: 'text',
            GroupNameDescription: 'text'
          },
          action: put(TYPE_SETTING.updateGroupName)
        },
        {
          bodyAPI: {
            GroupNameId: '',
            PermissionIds: 'Multiselect'
          },
          action: put(TYPE_SETTING.setPermissionsToGroupName)
        }
      ]
    }
  };
  const propsTable = (): ITable => ({
    body: allGroupNames,
    currentBody: currentGroupName,
    widthCell: [-30, 50, 100, 700],
    mainAction: get(TYPE_SETTING.getAllGroupsNames),
    subAction: [get(TYPE_SETTING.getAllPermissions)],
    deleteAction: { params: 'GroupNameId', action: del(TYPE_SETTING.deleteGroupName) },
    modalForm: formRole
  });

  return <TableCS {...propsTable()} />;
};

export default Role;
