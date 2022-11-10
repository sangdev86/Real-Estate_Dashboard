export interface ITokenFcm {
  currentToken: string;
  listToken: string[];
}
export interface IAddress {
  home: string;
  ward: string;
  district: string;
  city: string;
}
export interface IUserInfo {
  tokenFCM: ITokenFcm;
  phone: string;
  name: string;
  password: string;
  gender: string;
  temporaryAddress: IAddress;
  permanentAddress: IAddress;
  temporaryAddressText: IAddress;
  permanentAddressText: IAddress;
  dayOfBirth: Date;
  email: string;
  KYC: object;
  approveStatus: string;
  approveAt: Date;
  rejects: object[];
  identityNumber: string;
  updateKycAt: Date;
  dateOfIssue: Date;
  placeOfIssue: Number;
  employeeApproveId: string;
  score: number;
  referrerCode: string;
  role: string;
  avatar: string;
}
