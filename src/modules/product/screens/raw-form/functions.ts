import Snackbar from 'react-native-snackbar';
import {initialForm, isSubmitDisabled, useForm} from '../../../../hooks/form';
import {useCreateRaw, useUpdateRaw} from '../../../../hooks/services/raws';
import {setErrorMessage} from '../../../../utils/helpers';
import {Keyboard} from 'react-native';
import {useCallback, useEffect} from 'react';

export const useRawForm = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;
  const isEdit = Boolean(params?.data?.id);

  const [form, setForm] = useForm({
    name: {
      ...initialForm,
      label: 'Nama Bahan Baku',
    },
    pricePerKg: {
      ...initialForm,
      label: 'Harga Bahan Baku Per Kg',
      type: 'currency',
    },
  });
  const {createRaw, createRawService} = useCreateRaw();
  const {updateRaw, updateRawService} = useUpdateRaw();
  const isLoading =
    createRaw.loading === 'pending' || updateRaw.loading === 'pending';

  const autoFill = useCallback(() => {
    if (!isEdit) return;
    const {data} = params;
    let formNew = {...form};
    formNew.name.value = data?.name;
    formNew.pricePerKg.value = data?.pricePerKg;
    setForm('@override', formNew);
  }, [isEdit, params]);
  useEffect(autoFill, [autoFill]);

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      if (isSubmitDisabled(form)) {
        return setForm('@revalidate');
      }
      const {name, pricePerKg} = form;
      let payload = {
        name: name.value,
        pricePerKg: pricePerKg.value,
      };
      isEdit
        ? await updateRawService(params?.data?.id, payload)
        : await createRawService(payload);
      Snackbar.show({
        text: `Bahan Baku Berhasil ${isEdit ? 'Diubah' : 'Ditambahkan'}.`,
      });
      navigation?.goBack();
    } catch (error) {
      Snackbar.show({text: setErrorMessage(error)});
    }
  };

  return {form, isLoading, isEdit, action: {setForm, onSubmit}};
};

export type UseRawForm = ReturnType<typeof useRawForm>;
