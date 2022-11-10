export interface IPayment {
  PaymentId: string | number;
  Amount: string | number;
  Date: string | number;
  Type: string;
  Description: string;
  UserId: string | number;
}
export interface IInvoice {
  InvoiceId: string | number;
  TotalAmount: string | number;
  Date: string | number;
  Description: string;
  UserId: string | number;
}
export interface IHistory {
  allPayments: IPayment[];
  allInvoices: IInvoice[];
}
