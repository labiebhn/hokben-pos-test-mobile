import axios from 'axios';
import ENDPOINTS from '../constants/endpoints';

export const createTransaction = (data: any) => {
  return axios.post(ENDPOINTS.TRANSACTION.POST, data);
};

export const getTransaction = () => {
  return axios.get(ENDPOINTS.TRANSACTION.GET);
};

export const getTransactionDetail = (id: any) => {
  return axios.get(ENDPOINTS.TRANSACTION.GET_DETAIL.replace(':id', id));
};
