import {useCallback, useEffect, useState} from 'react';
import {initialForm, isSubmitDisabled, useForm} from '../../../../hooks/form';
import {
  useCreateProduct,
  useUpdateProduct,
} from '../../../../hooks/services/products';
import {Keyboard} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {mapRawData, setErrorMessage} from '../../../../utils/helpers';

export const useProductForm = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;
  const isEdit = Boolean(params?.data?.id);

  const [form, setForm] = useForm({
    name: {
      ...initialForm,
      label: 'Nama Produk',
    },
    price: {
      ...initialForm,
      label: 'Harga Produk',
      type: 'currency',
    },
    productImage: {
      ...initialForm,
      placeholder: 'Gambar Produk',
      required: false,
    },
    raws: {
      ...initialForm,
      label: 'Bahan Baku Produk',
      value: null,
    },
  });
  const {createProduct, createProductService} = useCreateProduct();
  const {updateProduct, updateProductService} = useUpdateProduct();
  const isLoading =
    createProduct.loading === 'pending' || updateProduct.loading === 'pending';

  const [deletedRaws, setDeletedRaws] = useState([]);

  const autoFill = useCallback(() => {
    if (!isEdit) return;
    const {data} = params;
    let formNew = {...form};
    formNew.name.value = data?.name;
    formNew.price.value = data?.price;
    formNew.productImage.value = data?.imageUri;
    formNew.raws.value = mapRawData(data.raws);
    setForm('@override', formNew);
  }, [isEdit, params]);
  useEffect(autoFill, [autoFill]);

  const onRawChange = (newRaw: any, deletedRaw: any) => {
    setDeletedRaws(deletedRaw);
    setForm('raws', newRaw);
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      if (isSubmitDisabled(form)) {
        return setForm('@revalidate');
      }

      let formData = new FormData();
      const {name, price, productImage, raws} = form;
      formData.append('name', name.value);
      formData.append('price', price.value);

      if (typeof productImage?.value !== 'string') {
        formData.append('productImage', {
          uri: productImage?.value?.uri,
          type: productImage?.value?.type,
          name: productImage?.value?.fileName,
        });
      }
      raws.value.forEach((raw: any, index: any) => {
        Object.keys(raw)?.forEach(key => {
          formData.append(`raws[${index}][${key}]`, raw[key]);
        });
      });

      if (isEdit) {
        if (deletedRaws.length) {
          deletedRaws.forEach((raw: any, index: any) => {
            formData.append(`deletedRaws[${index}]`, raw?.id);
          });
        }
        await updateProductService(params?.data?.id, formData);
      } else {
        await createProductService(formData);
      }

      Snackbar.show({
        text: `Bahan Baku Berhasil ${isEdit ? 'Diubah' : 'Ditambahkan'}.`,
      });
      navigation?.goBack();
    } catch (error) {
      Snackbar.show({text: setErrorMessage(error)});
    }
  };
  return {form, isLoading, isEdit, action: {setForm, onRawChange, onSubmit}};
};

export type UseProductForm = ReturnType<typeof useProductForm>;
