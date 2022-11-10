import TableCS, { ITable } from 'src/components/Table';
import { IForm } from 'src/components/Form/Form';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { TYPE_HISTORY } from '../../redux/history.async-thunk';
import { TYPE_ACCOUNTS } from 'src/features/Accounts/redux/accounts.async-thunk';

export default function Payments() {
  const { get, put } = ACTION;

  const modalForm: IForm = {
    body: { PaymentId: '', Amount: '', Date: '', Type: '', Description: '', UserId: '' },

    typeForm: 'add',
    add: {
      tittleForm: 'Nạp tiền cho người dùng',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: { Amount: 'text', Type: '', Description: 'text', UserId: 'select' },
          action: put(TYPE_HISTORY.updatePaymentByAdmin)
        }
      ]
    },
    update: {
      tittleForm: 'Cập nhật thông tin nạp tiền',
      button: 'Xác nhận',
      asyncActionForm: [
        {
          bodyAPI: { PaymentId: '', Amount: '', Type: '', Description: 'text', UserId: 'select' },
          action: put(TYPE_HISTORY.updatePaymentByAdmin)
        }
      ]
    }
  };

  const props = (): ITable => ({
    body: [],
    featuresTable: 'allPayments',
    currentBody: { PaymentId: '', Amount: '', Date: '', Type: '', Description: '', UserId: '' },
    sizeWH: ['100%', '100%'],
    widthCell: {
      0: -50,
      1: 100,
      2: 100,
      3: 100,
      4: 200,
      5: 100,
      6: 50,
      7: 300,
      8: 50,
      9: 100,
      10: 0,
      11: 50,
      12: 50,
      13: 50,
      14: 50
    },
    subAction: [get(TYPE_ACCOUNTS.getAllUsers)],
    mainAction: get(TYPE_HISTORY.getAllPaymentsByAdmin),
    modalForm: modalForm
  });

  return <TableCS {...props()} />;
}
