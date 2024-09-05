import {useCallback, useEffect, useState} from 'react';
import {RAW_LIST_PARAMS_TYPE} from '../../../../constants/product';
import {useDeleteRaw, useGetRaw} from '../../../../hooks/services/raws';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {setErrorMessage} from '../../../../utils/helpers';

export const useRawList = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;
  const isSelection = params?.type === RAW_LIST_PARAMS_TYPE.SELECT;

  const {getRaw, getRawService} = useGetRaw();
  const {data} = getRaw;

  const {deleteRaw, deleteRawService} = useDeleteRaw();

  const isLoading =
    getRaw.loading === 'pending' || deleteRaw.loading === 'pending';

  const [refreshing, setRefreshing] = useState(false);

  const fetch = () => {
    getRawService();
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
    navigation.navigate('raw-form', params);
  };

  const onEdit = (raw: any) => {
    goToForm({data: raw});
  };

  const askForDelete = (raw: any) => {
    Alert.alert('Hapus Bahan Baku', raw?.name, [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => onDelete(raw)},
    ]);
  };

  const onDelete = async (raw: any) => {
    try {
      await deleteRawService(raw?.id);
      fetch();
      Snackbar.show({text: `${raw?.name} sudah dihapus.`});
    } catch (error) {
      Snackbar.show({text: setErrorMessage(error)});
    }
  };

  return {
    isSelection,
    data,
    isLoading,
    refreshing,
    action: {goToForm, onRefresh, onEdit, askForDelete},
  };
};

export type UseRawList = ReturnType<typeof useRawList>;
