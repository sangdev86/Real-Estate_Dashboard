import axios from 'axios';
import SETTING from 'src/config/setting';
import { getUser } from 'src/config/storage';

class Api {
  needLoginAgainSubscribers = [];

  token: any;
  host: any;
  constructor(host: any) {
    this.host = host;
  }

  setToken(token: any) {
    this.token = token;
  }

  formatQuery(query: any) {
    let queryString = '?';
    for (const key in query) {
      if (typeof query[key] !== 'undefined' && query[key] != null) {
        queryString += `${key}=${query[key]}&`;
      }
    }
    return queryString;
  }

  async fetchData(api: string, method = 'GET', body?: any | any[], additionalOptions = {}) {
    if (!api.includes(this.host)) {
      api = this.host + api;
    }
    // console.log('Method: ', method, 'Api', api);
    // console.log('Body', body);
    try {
      const options: any = {
        method,
        headers: {
          Accept: 'application/json'
        },
        data: body,
        ...additionalOptions
      };
      if (typeof body === 'string') {
        options.headers['Content-Type'] = 'application/json';
      } else if (body instanceof FormData) {
        options.headers['Content-Type'] = 'multipart/form-data';
      }
      if (this.token) {
        options.headers['Authorization'] = this.token;
      }

      if (getUser()) {
        const { AccessToken, ClientId } = getUser();
        options.headers['Client'] = ClientId;
        options.headers['X-Auth-Token'] = AccessToken;
      }

      try {
        const response = await axios(api, options);
        // console.log(response);
        const json = response.data;
        // console.log('Response of', api, json);

        return json;
        // code: json.statusCode,
        // success:
        //   response.status >= 200 &&
        //   response.status < 300 &&
        //   json.statusCode >= 200 &&
        //   json.statusCode < 300
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.log('response of', api, 'error', err.response.data);
          const response = err.response;
          const json = response.data;
          if (json.statusCode === 401 && json.errors && json.errors.token === 5000605)
            return {
              ...json,
              code: json.statusCode,
              success:
                response.status >= 200 &&
                response.status < 300 &&
                json.statusCode >= 200 &&
                json.statusCode < 300
            };
        }
        console.log('response of', api, 'error', err);
        throw err;
      }
    } catch (err) {
      console.log('Response error: ', api, err);
      // return { code: -1, errors: err, success: false };
    }
  }
}

const api = new Api(SETTING.BACKEND_HOST);
export default api;
