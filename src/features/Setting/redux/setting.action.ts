import APISetting from '../modules/setting.api';
export const Types = {
  getAllPermissions: 'SETTINGS.getAllPermissions',
  getAllGroupNames: 'SETTINGS.getAllGroupNames'
};

export const TYPE_SETTING = {
  createPermission: {
    type: 'SETTINGS.createPermission',
    api: APISetting.createPermission
  },
  updatePermission: {
    type: 'SETTINGS.updatePermission',
    api: APISetting.updatePermission
  },
  deletePermission: {
    type: 'SETTINGS.deletePermission',
    api: APISetting.deletePermission
  },
  getAllPermissions: {
    type: 'SETTINGS.getAllPermissions',
    api: APISetting.getAllPermissions
  },

  //groupName
  createGroupName: {
    type: 'SETTINGS.createGroupName',
    api: APISetting.createGroupName
  },
  updateGroupName: {
    type: 'SETTINGS.updateGroupName',
    api: APISetting.updateGroupName
  },
  deleteGroupName: {
    type: 'SETTINGS.deleteGroupName',
    api: APISetting.deleteGroupName
  },
  getAllGroupsNames: {
    type: 'SETTINGS.getAllGroupNames',
    api: APISetting.getAllGroupNames
  },
  setPermissionsToGroupName: {
    type: 'SETTINGS.setPermissionsToGroupName',
    api: APISetting.setPermissionsToGroupName
  },

  //Approvalmanagers
  getAllApprovalmanagers: {
    type: 'SETTINGS.getAllApprovalmanagers',
    api: APISetting.getAllApprovalmanagers
  },

  // Address
  getAllAddressOfCurrentUser: {
    type: 'SETTINGS.getAllAddressOfCurrentUser',
    api: APISetting.getAllAddressOfCurrentUser
  }
};
