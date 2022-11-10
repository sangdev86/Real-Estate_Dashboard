import service from 'src/services/client';

const historyAPI = {
  // Payment
  makePaymentByadmin: (body: any) => {
    return service.fetchData('/billings/payments', 'POST', body);
  },
  getAllPaymentsByAdmin: () => {
    return service.fetchData('/billings/payments/all');
  },
  updatePaymentByAdmin: (body: any) => {
    const updateBody = { ...body };
    const { PaymentId, Amount, UserId } = body;
    updateBody.PaymentId = parseInt(PaymentId);
    updateBody.Amount = parseInt(Amount);
    updateBody.UserId = parseInt(UserId);

    return service.fetchData('/billings/payments', 'PUT', updateBody);
  },

  // Invoice
  makeInvoiceByadmin: (body: any) => {
    return service.fetchData('/billings/invoices', 'POST', body);
  },
  getAllInvoicesByAdmin: () => {
    return service.fetchData('/billings/invoices/all');
  },
  updateInvoiceByAdmin: (body: any) => {
    return service.fetchData('/billings/invoices', 'PUT', body);
  }
};

export default historyAPI;
