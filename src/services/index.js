import axios from 'axios';
import store from 'store';
import {showErrorMessage} from './auth';

const checkStatus = status => status >= 200 && status < 300;

export const apiRootLive = 'http://54.171.172.119:3001';

const client = axios.create({
  baseURL: apiRootLive,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  validateStatus: checkStatus,
});

// Add token for every request if provided
client.interceptors.request.use(
  async function (config) {
    const state = store.getState();

    const token = state.auth?.accessToken || null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log({config});
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('api response>>', response, response?.config?.url);
    return response;
  },
  function (error) {
    console.log('errrrrrrrrr', error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (
      error?.response?.data?.error?.message === 'Unauthorized' &&
      error?.response?.data?.error?.statusCode === 401
    ) {
    }
    console.log('err>>', error?.response);
    showErrorMessage(error);
    return Promise.reject(error);
  },
);

export {client};
