import {initialForm, useForm} from '../../../../hooks/form';

export const useRawForm = () => {
  const [form, setForm] = useForm({
    rawName: {
      ...initialForm,
      label: 'Nama Bahan Baku',
    },
    rawPrice: {
      ...initialForm,
      label: 'Harga Bahan Baku Per Gram',
      type: 'currency',
    },
  });
  return {form, action: {setForm}};
};

export type UseRawForm = ReturnType<typeof useRawForm>;
