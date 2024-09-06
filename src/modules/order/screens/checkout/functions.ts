import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {useMemo, useState} from 'react';
import {METHOD_ORDER} from '../../../../constants/order';
import {
  getGrandTotal,
  getTotalBill,
  getTotalPackaging,
} from '../../../../utils/helpers';
import CONFIGS from '../../../../configs';

export const useCheckout = (props: any) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.cart.products, shallowEqual);

  const [methodOrder, setMethodOrder] = useState(METHOD_ORDER.DINE_IN);

  const totalBill = useMemo(() => {
    return getTotalBill(data);
  }, [data]);

  const totalPackaging = useMemo(() => {
    return methodOrder === METHOD_ORDER.TAKE_AWAY ? getTotalPackaging(data) : 0;
  }, [data, methodOrder]);

  const grandTotal = useMemo(() => {
    return getGrandTotal(data, methodOrder);
  }, [data, methodOrder]);

  return {
    data,
    methodOrder,
    totalBill,
    totalPackaging,
    grandTotal,
    action: {setMethodOrder},
  };
};

export type UseCheckout = ReturnType<typeof useCheckout>;
