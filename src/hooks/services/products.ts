import {useServices} from '.';
import {PRODUCT} from '../../services';

export const useGetProduct = () => {
  const {state, service, reset} = useServices(PRODUCT.getProduct as any);
  return {
    getProduct: state,
    getProductService: () => service(),
    getProductReset: reset,
  };
};

export const useCreateProduct = () => {
  const {state, service, reset} = useServices(PRODUCT.createProduct as any);
  return {
    createProduct: state,
    createProductService: (data: any) => service(data),
    createProductReset: reset,
  };
};

export const useUpdateProduct = () => {
  const {state, service, reset} = useServices(PRODUCT.updateProduct as any);
  return {
    updateProduct: state,
    updateProductService: (id: any, data: any) => service(id, data),
    updateProductReset: reset,
  };
};

export const useDeleteProduct = () => {
  const {state, service, reset} = useServices(PRODUCT.deleteProduct as any);
  return {
    deleteProduct: state,
    deleteProductService: (id: any) => service(id),
    deleteProductReset: reset,
  };
};
