import {useEffect, useState} from 'react';
import {useGetTransaction} from '../../../../hooks/services/transactions';

export const useTransactionList = (props: any) => {
  const {navigation} = props;

  const {getTransaction, getTransactionService} = useGetTransaction();
  const {loading, data} = getTransaction;
  const isLoading = loading === 'pending';

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (refreshing && !isLoading) {
      setRefreshing(false);
    }
  }, [refreshing, isLoading]);

  const fetch = () => {
    getTransactionService();
  };

  const onRefresh = () => {
    fetch();
    setRefreshing(true);
  };

  const goToDetail = (id?: any) => {
    navigation.navigate('transaction-detail', {id});
  };

  return {
    isLoading,
    data,
    refreshing,
    action: {
      onRefresh,
      goToDetail,
    },
  };
};

export type UseTransactionList = ReturnType<typeof useTransactionList>;
