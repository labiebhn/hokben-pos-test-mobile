import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

import CONFIGS from './';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.baseURL = CONFIGS.BASE_URL;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: any): Promise<AxiosError> => {
  return Promise.reject(error);
};

export const interceptors = () => {
  axios.interceptors.request.use(onRequest, onRequestError);
  axios.interceptors.response.use(onResponse, onResponseError);
  return axios;
};
