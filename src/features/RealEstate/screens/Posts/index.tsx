import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { IForm } from 'src/components/Form/Form';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_REALESTATE } from '../../redux/realEstate.action';

const Posts: React.FC = () => {
  const allSellPosts = useSelector((state: RootState) => state.realEstate.allSellPosts);
  const currerntAllSellPost = useSelector(
    (state: RootState) => state.realEstate.currerntAllSellPost
  );
  const { get, put, post, del } = ACTION;

  const formSellPost: IForm = {
    body: currerntAllSellPost,
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm tin đăng',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: { Price: 'text', HomeId: 'select' },
          action: post(TYPE_REALESTATE.createSellPost)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật tin đăng',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: { SellId: '', Price: 'text', Status: 'text' },
          action: put(TYPE_REALESTATE.updateSellPost)
        }
      ]
    }
  };

  const tableSellPost = (): ITable => ({
    body: allSellPosts,
    currentBody: currerntAllSellPost,
    widthCell: [50, 300, 400, 100, 100, 100, 100, 100, 100, 100, 0],
    subAction: [get(TYPE_REALESTATE.getAllSellPosts), get(TYPE_REALESTATE.getAllHomes)],
    mainAction: get(TYPE_REALESTATE.getAllSellPosts),
    modalForm: formSellPost,
    deleteAction: { params: 'SellId', action: del(TYPE_REALESTATE.deleteSellPost) }
  });
  return <TableCS {...tableSellPost()} />;
};

export default Posts;
