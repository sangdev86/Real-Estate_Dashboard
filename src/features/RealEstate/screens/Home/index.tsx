import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { IForm } from 'src/components/Form/Form';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_ACCOUNTS } from 'src/features/Accounts/redux/accounts.async-thunk';
import { TYPE_SETTING } from 'src/features/Setting/redux/setting.action';
import { TYPE_REALESTATE } from '../../redux/realEstate.action';

const Home: React.FC = () => {
  const realEstate = useSelector((state: RootState) => state.realEstate);

  const { allHome, currentHome } = realEstate;
  const { get, put, post } = ACTION;

  const modalForm: IForm = {
    body: currentHome,
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm tài sản',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: {
            Type: 'select',
            Year: 'text',
            Length: 'text',
            Width: 'text',
            Height: 'text',
            SiteArea: 'text',
            ConstructionArea: 'text',
            BedRooms: 'text',
            BathRooms: 'text',
            Floors: 'text',
            Road: 'text',
            Direction: 'text',
            DirectionBalcony: 'text',
            AddressId: 'select',
            Owner: 'text'
          },
          action: post(TYPE_REALESTATE.createHome)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật thông tin tài sản',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: {
            HomeId: '',
            Type: 'select',
            SiteArea: 'text',
            ConstructionArea: 'text',
            BedRooms: 'text',
            BathRooms: 'text',
            Floors: 'text',
            Road: 'text',
            Direction: 'text',
            DirectionBalcony: 'text',
            AddressId: 'select',
            Owner: 'text'
          },
          action: put(TYPE_REALESTATE.updateHome)
        }
      ]
    }
  };
  const props = (): ITable => ({
    body: allHome,
    currentBody: currentHome,
    widthCell: [
      50, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0
    ],
    subAction: [
      get(TYPE_REALESTATE.getAllAttributes),
      get(TYPE_ACCOUNTS.getAllUsers),
      get(TYPE_SETTING.getAllAddressOfCurrentUser)
    ],
    mainAction: get(TYPE_REALESTATE.getAllHomes),

    modalForm: modalForm
  });
  return <TableCS {...props()} />;
};

export default Home;
