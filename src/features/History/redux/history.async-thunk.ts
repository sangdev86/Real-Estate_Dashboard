import historyAPI from '../module/history.api';

export const TYPE_HISTORY = {
  //payment
  makePaymentByadmin: {
    type: 'BILLINGS.makePaymentByadmin',
    api: historyAPI.makePaymentByadmin
  },
  getAllPaymentsByAdmin: {
    type: 'BILLINGS.getAllPaymentsByAdmin',
    api: historyAPI.getAllPaymentsByAdmin
  },
  updatePaymentByAdmin: {
    type: 'BILLINGS.updatePaymentByAdmin',
    api: historyAPI.updatePaymentByAdmin
  },

  // billings
  makeInvoiceByadmin: {
    type: 'BILLINGS.makeInvoiceByadmin',
    api: historyAPI.makeInvoiceByadmin
  },
  getAllInvoicesByAdmin: {
    type: 'BILLINGS.getAllInvoicesByAdmin',
    api: historyAPI.getAllInvoicesByAdmin
  },
  updateInvoiceByAdmin: {
    type: 'BILLINGS.updateInvoiceByAdmin',
    api: historyAPI.updateInvoiceByAdmin
  }
};
