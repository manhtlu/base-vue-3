import axios from 'axios';
import useToken from "@/compositions/useToken";
const API_URL = import.meta.env.VITE_VUE_APP_API_URL + '/api/';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(async function (config) {
  const {getToken} = useToken();
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(
  function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default {
  request (method, url, params, data, headers = {}, config = {}) {
    return axios.request({ ...config, url, params, data, method: method.toLowerCase(), headers });
  },

  get (url, params) {
    return this.request('get', url, params, {});
  },

  post (url, data, headers = {}, config = {}) {
    return this.request('post', url, {}, data, headers, config);
  },

  put (url, data) {
    return this.request('put', url, {}, data);
  },

  patch (url, data) {
    return this.request('patch', url, {}, data);
  },

  delete (url, data = {}) {
    return this.request('delete', url, {}, data);
  },

  async download (url, params = {}) {
    return this.request('get', url, params, {}, {}, { responseType: 'blob' });
  },
};
