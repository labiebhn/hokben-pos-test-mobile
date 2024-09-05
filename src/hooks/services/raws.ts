import {useServices} from '.';
import {RAW} from '../../services';

export const useGetRaw = () => {
  const {state, service, reset} = useServices(RAW.getRaw as any);
  return {
    getRaw: state,
    getRawService: () => service(),
    getRawReset: reset,
  };
};

export const useCreateRaw = () => {
  const {state, service, reset} = useServices(RAW.createRaw as any);
  return {
    createRaw: state,
    createRawService: (data: any) => service(data),
    createRawReset: reset,
  };
};

export const useUpdateRaw = () => {
  const {state, service, reset} = useServices(RAW.updateRaw as any);
  return {
    updateRaw: state,
    updateRawService: (id: any, data: any) => service(id, data),
    updateRawReset: reset,
  };
};

export const useDeleteRaw = () => {
  const {state, service, reset} = useServices(RAW.deleteRaw as any);
  return {
    deleteRaw: state,
    deleteRawService: (id: any) => service(id),
    deleteRawReset: reset,
  };
};
