import axios from 'axios';
import ENDPOINTS from '../constants/endpoints';

export const createRaw = (data: any) => {
  return axios.post(ENDPOINTS.RAW.POST, data);
};

export const getRaw = () => {
  return axios.get(ENDPOINTS.RAW.GET);
};

export const updateRaw = (id: any, data: any) => {
  return axios.put(ENDPOINTS.RAW.PUT.replace(':id', id), data);
};

export const deleteRaw = (id: any) => {
  return axios.delete(ENDPOINTS.RAW.DELETE.replace(':id', id));
};
