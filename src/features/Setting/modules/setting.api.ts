import service from 'src/services/client';

const APISetting = {
  //permissions
  createPermission: (body: any) => service.fetchData('/permissions', 'POST', body),
  updatePermission: (body: any) => service.fetchData('/permissions', 'PUT', body),
  deletePermission: (id: any) => service.fetchData(`/permissions/${id}`, 'DELETE'),
  getAllPermissions: () => service.fetchData('/permissions'),

  // groupName
  createGroupName: (body: any) => service.fetchData('/groupnames', 'POST', body),
  updateGroupName: (body: any) => service.fetchData('/groupnames', 'PUT', body),
  deleteGroupName: (id: any) => service.fetchData(`/groupnames/${id}`, 'DELETE'),
  getAllGroupNames: () => service.fetchData('/groupnames'),
  setPermissionsToGroupName: (body: any) =>
    service.fetchData('/groupnames/permissions', 'PUT', body),

  getAllApprovalmanagers: () => service.fetchData('/approvalmanager'),

  // address
  getAllAddressOfCurrentUser: () => {
    return service.fetchData('/address/users');
  }
};

export default APISetting;
