export interface IPermission {
  PermissionId?: string;
  PermissionName: string;
  PermissionDescription: string;
}

export interface IGroupName {
  GroupNameId: string;
  GroupNameName: string;
  GroupNameDescription: string;
  PermissionIds: string[] | number[];
}
export interface IApprovalmanager {
  ApprovalManagerId: string;
  ProvinceId: string;
  DistrictId: string;
  WardId: string;
  UserId: string;
  GroupNameId: string;
}

export interface IAddressCurUser {
  AddressId: string;
  Detail: string;
  Date: string;
  UserId: string;
  Ward: {
    WardId: string;
    Name: string;
    Type: string;
    DistrictId: string;
  };
  District: {
    DistrictId: string;
    Name: string;
    Type: string;
    ProvinceId: string;
  };
  Province: {
    ProvinceId: string;
    Name: string;
    Type: string;
  };
}

export interface ISetting {
  isFetching: boolean;
  isLoading: boolean;
  allPermissions: IPermission[];
  currentPermission: IPermission;
  allGroupNames: IGroupName[];
  currentGroupName: IGroupName;
  allApprovalmanagers: IApprovalmanager[];
  currentApprovalmanager: IApprovalmanager;
  allAddressCurrentUser: IAddressCurUser[];
}
