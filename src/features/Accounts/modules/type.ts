export interface IUser {
  UserId: number | string;
  PhoneNumber: number | string;
  Email: null | string;
  Name: string;
  Birth: string;
  Sex: number | string;
  Address: string;
  IdCard: string;
  Type: string;
  AvatarIMG: string;
  Status: string;
  GroupNameId: string;
  Commission: string;
  Airdrop: string;
  Password: string;
}
export interface IKYC {
  KYCId: number;
  Type: string;
  No: string;
  DateOfBirth: number;
  DateOfIssue: number;
  PlaceOfBirth: string;
  PlaceOfIssue: string;
  Nationality: string;
  DateOfExpiry: string;
  FullName: string;
  Sex: string;
  Status: string;
  VerifiedByUserId: string;
  UserId: string;
}

export interface IAccounts {
  allUsers: IUser[] | any[];
  currentUser: IUser;
  KYC: IKYC[];
  currentKYC: IKYC;
  loadingForm: boolean;
  isFetching: boolean;
}
