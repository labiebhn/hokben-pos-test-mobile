import {initialForm, useForm} from '../../../../hooks/form';

export const useProductForm = () => {
  const [form, setForm] = useForm({
    productName: {
      ...initialForm,
      label: 'Nama Produk',
    },
    productPrice: {
      ...initialForm,
      label: 'Harga Produk',
      type: 'currency',
    },
    productImage: {
      ...initialForm,
      placeholder: 'Gambar Produk',
    },
    productRaw: {
      ...initialForm,
      label: 'Bahan Baku Produk',
      value: [],
    },
  });
  return {form, action: {setForm}};
};

export type UseProductForm = ReturnType<typeof useProductForm>;
