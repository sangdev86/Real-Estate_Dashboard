import TableCS, { ITable } from 'src/components/Table';
import { IForm } from 'src/components/Form/Form';
import { ACTION } from 'src/components/Actions/reducer/actions';
import { TYPE_HISTORY } from '../../redux/history.async-thunk';
import { TYPE_ACCOUNTS } from 'src/features/Accounts/redux/accounts.async-thunk';

export default function Invoices() {
  const { get, put } = ACTION;

  const modalForm: IForm = {
    body: { InvoiceId: '', TotalAmount: '', Date: '', Type: '', Description: '', UserId: '' },

    typeForm: 'add',
    add: {
      tittleForm: 'Tạo hóa đơn trừ tiền',
      button: 'Tạo',
      asyncActionForm: [
        {
          bodyAPI: { TotalAmount: 'text', Description: 'text', UserId: 'select' },
          action: put(TYPE_HISTORY.makeInvoiceByadmin)
        }
      ]
    }
  };

  const props = (): ITable => ({
    body: [],
    featuresTable: 'allInvoices',
    currentBody: { InvoiceId: '', TotalAmount: '', Date: '', Description: '', UserId: '' },
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
    mainAction: get(TYPE_HISTORY.getAllInvoicesByAdmin),
    modalForm: modalForm
  });

  return <TableCS {...props()} />;
}
