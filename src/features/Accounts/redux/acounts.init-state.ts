import { IAccounts, IUser } from '../modules/type';

export const user: IUser = {
  UserId: '',
  PhoneNumber: '',
  Email: '',
  Name: '',
  Birth: '',
  Sex: '',
  Address: '',
  IdCard: '',
  Type: '',
  AvatarIMG: '',
  Status: '',
  GroupNameId: '',
  Commission: '',
  Airdrop: '',
  Password: ''
};
export const initialState: IAccounts = {
  allUsers: [],
  currentUser: user,
  KYC: [],
  currentKYC: {
    KYCId: 0,
    Type: '',
    No: '',
    DateOfBirth: 0,
    DateOfIssue: 0,
    PlaceOfBirth: '',
    PlaceOfIssue: '',
    Nationality: '',
    DateOfExpiry: '',
    FullName: '',
    Sex: '',
    Status: '',
    VerifiedByUserId: '',
    UserId: ''
  },
  isFetching: false,
  loadingForm: false
};
