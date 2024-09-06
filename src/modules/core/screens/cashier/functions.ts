import {useFocusEffect} from '@react-navigation/native';
import {useGetProduct} from '../../../../hooks/services/products';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {addToCart} from '../../../order/store/cartSlice';
import {shallowEqual} from 'react-redux';
import {getTotalQty} from '../../../../utils/helpers';

export const useCashier = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.products, shallowEqual);

  const {getProduct, getProductService} = useGetProduct();
  const {data} = getProduct;
  const isLoading = getProduct.loading === 'pending';
  const [refreshing, setRefreshing] = useState(false);

  const totalQtyCart = useMemo(() => {
    return getTotalQty(cart);
  }, [cart]);

  const fetch = () => {
    getProductService();
  };

  useFocusEffect(
    useCallback(() => {
      fetch();
    }, []),
  );

  const onRefresh = () => {
    fetch();
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing && isLoading) {
      setRefreshing(false);
    }
  }, [isLoading, refreshing]);

  const goToCart = () => {
    navigation.navigate('cart');
  };

  const onAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const enableSubmit = Boolean(totalQtyCart);

  return {
    refreshing,
    data,
    isLoading,
    totalQtyCart,
    enableSubmit,
    action: {goToCart, onRefresh, onAddToCart},
  };
};

export type UseCashier = ReturnType<typeof useCashier>;
