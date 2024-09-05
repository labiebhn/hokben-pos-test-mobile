import {useCallback, useEffect, useState} from 'react';
import {RAW_LIST_PARAMS_TYPE} from '../../../../constants/product';
import {useDeleteRaw, useGetRaw} from '../../../../hooks/services/raws';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {deleteArray, setErrorMessage} from '../../../../utils/helpers';

export const useRawList = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;

  const isSelection = params?.type === RAW_LIST_PARAMS_TYPE.SELECT;
  const paramsRaw = params?.selectedRaw;

  const {getRaw, getRawService} = useGetRaw();
  const {data} = getRaw;

  const {deleteRaw, deleteRawService} = useDeleteRaw();

  const isLoading =
    getRaw.loading === 'pending' || deleteRaw.loading === 'pending';

  const [selectedRaw, setSelectedRaw] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setSelectedRaw(paramsRaw || []);
  }, [paramsRaw]);

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

  const toggleSelectRaw = (raw: any) => {
    let result: any = [...selectedRaw];
    const selectedIndex = selectedRaw.findIndex(
      (sRaw: any) => sRaw?.rawId === raw?.id,
    );
    if (selectedIndex >= 0) {
      result = deleteArray(result, selectedIndex);
    } else {
      result.push({name: raw?.name, rawId: raw?.id, usageInGram: '1'});
    }
    setSelectedRaw(result);
  };

  const getSelectedRawData = (raw: any) => {
    return selectedRaw.find((sRaw: any) => sRaw?.rawId === raw?.id);
  };

  const usageInGramChange = (raw: any, value: any) => {
    let result: any = [...selectedRaw];
    const selectedIndex = selectedRaw.findIndex(
      (sRaw: any) => sRaw?.rawId === raw?.id,
    );
    result[selectedIndex].usageInGram = value;
    setSelectedRaw(result);
  };

  const enableSubmit = isSelection ? Boolean(selectedRaw.length) : true;
  const onSubmit = () => {
    if (!isSelection) {
      goToForm();
      return;
    }
    let payload = selectedRaw.filter((sRaw: any) =>
      Boolean(Number(sRaw?.usageInGram)),
    );
    if (payload?.length) {
      let deletedPayload: any = [];
      if (paramsRaw && paramsRaw.length) {
        const rawIds = payload.map((sRaw: any) => sRaw?.rawId);
        deletedPayload = paramsRaw.filter(
          (sRaw: any) => !rawIds.includes(sRaw?.rawId),
        );
      }
      params?.callback?.(payload, deletedPayload);
    }
    navigation.goBack();
  };

  return {
    isSelection,
    data,
    isLoading,
    refreshing,
    selectedRaw,
    enableSubmit,
    action: {
      goToForm,
      onRefresh,
      onEdit,
      askForDelete,
      toggleSelectRaw,
      getSelectedRawData,
      usageInGramChange,
      onSubmit,
    },
  };
};

export type UseRawList = ReturnType<typeof useRawList>;
