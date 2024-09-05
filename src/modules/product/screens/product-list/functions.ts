import {useCallback, useEffect, useState} from 'react';
import {
  useDeleteProduct,
  useGetProduct,
} from '../../../../hooks/services/products';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {setErrorMessage} from '../../../../utils/helpers';

export const useProductList = (props: any) => {
  const {navigation, route} = props;

  const {getProduct, getProductService} = useGetProduct();
  const {data} = getProduct;

  const {deleteProduct, deleteProductService} = useDeleteProduct();

  const isLoading =
    getProduct.loading === 'pending' || deleteProduct.loading === 'pending';

  const [refreshing, setRefreshing] = useState(false);

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

  const goToForm = (params?: any) => {
    navigation.navigate('product-form', params);
  };

  const onEdit = (Product: any) => {
    goToForm({data: Product});
  };

  const askForDelete = (product: any) => {
    Alert.alert('Hapus Produk', product?.name, [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => onDelete(product)},
    ]);
  };

  const onDelete = async (product: any) => {
    try {
      await deleteProductService(product?.id);
      fetch();
      Snackbar.show({text: `${product?.name} sudah dihapus.`});
    } catch (error) {
      Snackbar.show({text: setErrorMessage(error)});
    }
  };

  return {
    data,
    isLoading,
    refreshing,
    action: {goToForm, onRefresh, onEdit, askForDelete},
  };
};

export type UseProductList = ReturnType<typeof useProductList>;
