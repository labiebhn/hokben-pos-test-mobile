import {useEffect, useState} from 'react';
import {useGetTransactionDetail} from '../../../../hooks/services/transactions';

export const useTransactionDetail = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;

  const {getTransactionDetail, getTransactionDetailService} =
    useGetTransactionDetail();
  const {loading, data} = getTransactionDetail;
  const isLoading = loading === 'pending';

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch();
  }, [params]);

  useEffect(() => {
    if (refreshing && !isLoading) {
      setRefreshing(false);
    }
  }, [refreshing, isLoading]);

  const fetch = () => {
    getTransactionDetailService(params?.id);
  };

  const onRefresh = () => {
    fetch();
    setRefreshing(true);
  };

  return {
    isLoading,
    data,
    refreshing,
    action: {
      onRefresh,
    },
  };
};

export type UseTransactionDetail = ReturnType<typeof useTransactionDetail>;
