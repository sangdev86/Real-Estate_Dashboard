export const saveUser = (user: any) => {
  return localStorage.setItem('app-user', JSON.stringify(user));
};

export const getUser = () => {
  const userString = localStorage.getItem('app-user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error(error);
    }
  }
  return null;
};

export const updateUser = (update: any) => {
  const userString = localStorage.getItem('app-user');
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return saveUser({ ...user, ...update });
    } catch (error) {
      console.error(error);
    }
  }
  return null;
};

export const removeUser = () => {
  localStorage.removeItem('app-user');
};

export const localStorageLanguage = {
  set: (lan: any) => localStorage.setItem('lan', lan),
  get: () => localStorage.getItem('lan')
};
