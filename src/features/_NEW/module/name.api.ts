import { convertBody } from '../../../utils/convertBody';
import service from 'src/services/client';

const nameAPI = {
  // User
  getAllUsers: () => {
    return service.fetchData('/users/getallusers');
  }
};

export default nameAPI;
