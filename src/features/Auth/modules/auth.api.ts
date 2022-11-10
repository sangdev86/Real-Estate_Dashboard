import { ILogin } from './type';

import service from 'src/services/client';

export const setToken = (token: string) => {
  return service.setToken(token);
};

export const removeToken = () => {
  return service.setToken('');
};

const authAPI = {
  login: (body: ILogin) => {
    return service.fetchData(`/users/login`, 'POST', body);
  }
};

export default authAPI;
