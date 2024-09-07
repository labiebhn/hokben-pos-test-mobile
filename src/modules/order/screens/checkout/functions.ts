import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {useMemo, useState} from 'react';
import {METHOD_ORDER} from '../../../../constants/order';
import {
  getGrandTotal,
  getTotalBill,
  getTotalPackaging,
  setErrorMessage,
} from '../../../../utils/helpers';
import CONFIGS from '../../../../configs';
import {useCreateTransaction} from '../../../../hooks/services/transactions';
import Snackbar from 'react-native-snackbar';
import {resetCart} from '../../store/cartSlice';

export const useCheckout = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.cart.products, shallowEqual);

  const {createTransaction, createTransactionService} = useCreateTransaction();

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

  const isLoading = createTransaction.loading === 'pending';

  const onSubmit = async () => {
    try {
      let payload = {
        method: methodOrder,
        orders: data.map(product => ({
          productId: product?.id,
          qty: product?.qty,
        })),
      };
      await createTransactionService(payload);
      Snackbar.show({text: 'Transaksi Berhasil.'});
      navigation?.reset({
        index: 1,
        routes: [{name: 'home'}, {name: 'cashier'}],
      });
      dispatch(resetCart());
    } catch (error) {
      Snackbar.show({text: setErrorMessage(error)});
    }
  };

  return {
    data,
    methodOrder,
    totalBill,
    totalPackaging,
    grandTotal,
    isLoading,
    action: {setMethodOrder, onSubmit},
  };
};

export type UseCheckout = ReturnType<typeof useCheckout>;
