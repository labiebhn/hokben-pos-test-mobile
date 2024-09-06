import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {spinnerCart} from '../../store/cartSlice';
import {useMemo} from 'react';
import {getTotalBill} from '../../../../utils/helpers';

export const useCart = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.cart.products, shallowEqual);

  const goToCheckout = () => {
    navigation.navigate('checkout');
  };

  const onSpinnerChange = (index: any, qty: any) => {
    dispatch(spinnerCart({index, qty}));
  };

  const enableSubmit = Boolean(data.length);

  const totalBill = useMemo(() => {
    return getTotalBill(data);
  }, [data]);

  return {
    data,
    enableSubmit,
    totalBill,
    action: {goToCheckout, onSpinnerChange},
  };
};

export type UseCart = ReturnType<typeof useCart>;
