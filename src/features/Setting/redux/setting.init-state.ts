import { ISetting } from '../modules/type';

export const initialState: ISetting = {
  isFetching: false,
  isLoading: false,
  allPermissions: [],
  currentPermission: {
    PermissionId: '',
    PermissionName: '',
    PermissionDescription: ''
  },
  allGroupNames: [],
  currentGroupName: {
    GroupNameId: '',
    GroupNameName: '',
    GroupNameDescription: '',
    PermissionIds: []
  },
  allApprovalmanagers: [],
  currentApprovalmanager: {
    ApprovalManagerId: '',
    ProvinceId: '',
    DistrictId: '',
    WardId: '',
    UserId: '',
    GroupNameId: ''
  },
  allAddressCurrentUser: []
};
