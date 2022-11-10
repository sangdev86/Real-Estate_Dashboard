import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { IForm } from 'src/components/Form/Form';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_REALESTATE } from '../../redux/realEstate.action';
import './attributes.scss';

const Attributes: React.FC = () => {
  const realEstate = useSelector((state: RootState) => state.realEstate);
  const { allAttributes, currentAttribute, allParentAttributes, currentParentAttributes } =
    realEstate;

  const { get, post, put } = ACTION;
  const { createAttributes, getAllAttributes, getAllParentAttributes, updateAttribtes } =
    TYPE_REALESTATE;

  // props

  const formParentAttributes: IForm = {
    body: currentParentAttributes,
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm nhóm thuộc tính',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: { ParentId: 0, Name: 'text' },
          action: post(createAttributes)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật nhóm thuộc tính',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: {
            AttributesId: '',
            ParentId: '',
            Status: 'text',
            Name: 'text',
            Unit: ''
          },
          action: put(updateAttribtes)
        }
      ]
    }
  };

  const propsParentAttribues = (): ITable => ({
    body: allParentAttributes,
    currentBody: currentParentAttributes,
    sizeWH: ['100%', '100%'],
    widthCell: [100, 100, 0, 100, 100, 100],
    subAction: [],
    mainAction: get(getAllParentAttributes),
    modalForm: formParentAttributes
  });

  const formAttributes: IForm = {
    body: currentAttribute,
    typeForm: 'add',
    add: {
      tittleForm: 'Thêm thuộc tính con',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: { ParentId: 'select', Name: 'text' },
          action: post(createAttributes)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật thuộc tính con',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: {
            AttributesId: '',
            ParentId: 'select',
            Status: 'text',
            Name: 'text',
            Unit: ''
          },
          action: put(updateAttribtes)
        }
      ]
    }
  };
  const propsAttributes = (): ITable => {
    const fillterChildAttributes: any[] = [];
    allAttributes.forEach((item) => {
      if (item.ParentId !== '0') {
        fillterChildAttributes.push(item);
      }
    });

    return {
      body: fillterChildAttributes,
      currentBody: currentAttribute,
      sizeWH: ['100%', '100%'],
      widthCell: [100, 10, 100, 1, 100, 100, 0],
      subAction: [get(getAllParentAttributes)],
      mainAction: get(getAllAttributes),
      modalForm: formAttributes
    };
  };

  return (
    <Box id="attributes">
      <TableCS {...propsParentAttribues()} />
      <TableCS {...propsAttributes()} />
    </Box>
  );
};

export default Attributes;
