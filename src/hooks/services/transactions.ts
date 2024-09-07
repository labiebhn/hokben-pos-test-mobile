import {useServices} from '.';
import {TRANSACTION} from '../../services';

export const useCreateTransaction = () => {
  const {state, service, reset} = useServices(
    TRANSACTION.createTransaction as any,
  );
  return {
    createTransaction: state,
    createTransactionService: (data: any) => service(data),
    createTransactionReset: reset,
  };
};

export const useGetTransaction = () => {
  const {state, service, reset} = useServices(
    TRANSACTION.getTransaction as any,
  );
  return {
    getTransaction: state,
    getTransactionService: () => service(),
    getTransactionReset: reset,
  };
};

export const useGetTransactionDetail = () => {
  const {state, service, reset} = useServices(
    TRANSACTION.getTransactionDetail as any,
  );
  return {
    getTransactionDetail: state,
    getTransactionDetailService: (id: any) => service(id),
    getTransactionDetailReset: reset,
  };
};
