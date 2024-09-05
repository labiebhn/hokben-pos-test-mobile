import axios from 'axios';
import ENDPOINTS from '../constants/endpoints';

export const createProduct = (data: any) => {
  return axios.post(ENDPOINTS.PRODUCT.POST, data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const getProduct = () => {
  return axios.get(ENDPOINTS.PRODUCT.GET);
};

export const updateProduct = (id: any, data: any) => {
  return axios.put(ENDPOINTS.PRODUCT.PUT.replace(':id', id), data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const deleteProduct = (id: any) => {
  return axios.delete(ENDPOINTS.PRODUCT.DELETE.replace(':id', id));
};
