import { convertBody } from '../../../utils/convertBody';
import service from 'src/services/client';

export const setToken = (token: string) => {
  return service.setToken(token);
};

export const removeToken = () => {
  return service.setToken('');
};

const accountsAPI = {
  // User
  getAllUsers: () => {
    return service.fetchData('/users/getallusers');
  },
  changeProfile: (body: any) => {
    const bodyAPI = convertBody(body, {
      Name: '',
      Birth: '',
      Sex: -1,
      IdCard: ''
    });
    return service.fetchData('/users/profile', 'PUT', bodyAPI);
  },
  changeProfileByAdmin: (body: any) => {
    return service.fetchData('/admins/users/profile', 'PUT', body);
  },

  resetPasswordsByAdmin: (body: any) => {
    console.log('body', body);
    return service.fetchData('/admins/users/passwords', 'PUT', body);
  },
  addUserToGroupName: (body: any) => {
    const bodyAPI = { UserId: parseInt(body.UserId), GroupNameId: parseInt(body.GroupNameId) };
    return service.fetchData('/groupnames/users', 'PUT', bodyAPI);
  },

  // KYC
  createKYC: (body: any) => {
    const update = { ...body };
    update.DateOfBirth = Date.parse(body.DateOfBirth);
    update.DateOfIssue = Date.parse(body.DateOfIssue);
    update.DateOfExpiry = Date.parse(body.DateOfExpiry);
    console.log('update', update);
    return service.fetchData('/kycs', 'POST', update);
  },
  updateKYC: (body: any) => {
    return service.fetchData('/kycs', 'PUT', body);
  },
  deleteKYC: (id: any) => {
    return service.fetchData(`/kycs/${id}`, 'DELETE');
  },
  verifyKYC: (body: any) => {
    return service.fetchData('/kycs/verify', 'PUT', body);
  },
  getKYC: (type: 'all' | 'wait' | 'verifiled' | 'rejected') => {
    console.log('type', type);
    return service.fetchData(`/kycs?type=${type}`);
  }
};

export default accountsAPI;
