export interface IAttribute {
  Name: string;
  AttributesId: string | number;
  ParentId: string | number;
  Unit: string;
  Status: string;
  UserId: string;
  child: IAttribute[];
}
export interface IParentAttributes {
  AttributesId: string | number;
  ParentId: string | number;
  Name: string;
  Unit: string;
  Status: string;
  UserId: string;
}

export interface IWard {
  WardId: string;
  Name: string;
  Type: string;
  DistrictId: string;
}
export interface IDistrict {
  DistrictId: string;
  Name: string;
  Type: string;
  ProvinceId: string;
}
export interface IProvince {
  ProvinceId: string;
  Name: string;
  Type: string;
}

export interface IAddress {
  AddressId: string;
  Detail: string;
  Date: string;
  UserId: string;
  Ward: IWard;
  District: IDistrict;
  Province: IProvince;
}

export interface IHome {
  HomeId: string;
  Type: string;
  Year: null | string;
  Length: null | string;
  Width: null | string;
  Height: null | string;
  SiteArea: string;
  ConstructionArea: string;
  BedRooms: string;
  BathRooms: string;
  Floors: string;
  Road: string;
  Direction: string;
  DirectionBalcony: string;
  AddressId: string;
  Owner: string;
  UserId: string;
  Address?: IAddress;
  Status?: string;
  Medias?: any[];
}
export interface ISellPost {
  SellId: string;
  Title: string;
  Description: string;
  Price: string;
  Status: string;
  Date: string;
  UserId: string;
  BusinessId: string;
  Approve: string;
  HomeId: string | number;
  Home: IHome;
}

export interface IRealEstate {
  isFetching: boolean;
  isLoading: boolean;
  allAttributes: IAttribute[];
  currentAttribute: IAttribute;
  allParentAttributes: IParentAttributes[];
  currentParentAttributes: IParentAttributes;
  address: IAddress;
  allHome: IHome[];
  currentHome: IHome;
  allSellPosts: ISellPost[];
  currerntAllSellPost: ISellPost;
}
