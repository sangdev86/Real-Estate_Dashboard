import { IHome, IRealEstate, IAddress } from '../modules/type';

const address: IAddress = {
  AddressId: '',
  Detail: '',
  Date: '',
  UserId: '',
  Ward: { WardId: '', Name: '', Type: '', DistrictId: '' },
  District: { DistrictId: '', Name: '', Type: '', ProvinceId: '' },
  Province: { ProvinceId: '', Name: '', Type: '' }
};
const home: IHome = {
  HomeId: '',
  Type: '',
  Year: '',
  Length: '',
  Width: '',
  Height: '',
  SiteArea: '',
  ConstructionArea: '',
  BedRooms: '',
  BathRooms: '',
  Floors: '',
  Road: '',
  Direction: '',
  DirectionBalcony: '',
  AddressId: '',
  Owner: '',
  UserId: '',
  Address: address
};

export const initialState: IRealEstate = {
  isFetching: false,
  isLoading: false,
  allAttributes: [],
  currentAttribute: {
    Name: '',
    AttributesId: '',
    ParentId: '',
    Unit: '',
    Status: '',
    UserId: '',
    child: []
  },
  allParentAttributes: [],
  currentParentAttributes: {
    Name: '',
    AttributesId: '',
    ParentId: 0,
    Unit: '',
    Status: '',
    UserId: ''
  },
  address: address,
  allHome: [],
  currentHome: home,
  allSellPosts: [],
  currerntAllSellPost: {
    SellId: '',
    Title: '',
    Description: '',
    Price: '',
    Status: '',
    Date: '',
    UserId: '',
    BusinessId: '',
    Approve: '',
    HomeId: '',
    Home: home
  }
};
