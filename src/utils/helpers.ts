import CONFIGS from '../configs';
import InitialState from '../store/types';
import {ResetStatusHook} from '../types/hooks';

export const imageUrl = (path?: string) => {
  let result = path;
  if (path && !path?.includes(CONFIGS.BASE_URL || '')) {
    result = `${CONFIGS.BASE_URL}/${path}`;
  }
  return result;
};

export const resetStatusHook = (
  initialState: InitialState,
  state: InitialState,
  key: ResetStatusHook,
) => {
  let stateNew = {...state};
  switch (key) {
    case 'loading':
      stateNew.loading = 'idle';
      stateNew.message = '';
      break;
    case 'data':
      stateNew.data = {};
      break;
    case 'all':
      stateNew = initialState;
      break;
    default:
      break;
  }
  return stateNew;
};

export const setErrorMessage = (action: any) => {
  if (typeof action === 'string') return action;
  let error = action?.paylaod || action;
  let message =
    error?.response?.data?.data?.message ??
    error?.response?.data?.meta?.message ??
    error?.response?.data?.message ??
    error?.response?.message ??
    error?.message ??
    'Server Sedang Mengalami Gangguan';

  return message;
};

export const deleteArray = (arr: any[], index: number) => {
  let arrNew = [...arr];
  arrNew.splice(index, 1);
  return arrNew;
};

export const getRawName = (raw: any) => {
  if (!raw) return '';
  return (
    raw.map((item: any) => `${item?.name} (${item?.usageInGram}g)`).join(', ') +
    '.'
  );
};

export const mapRawData = (raws: any) => {
  if (!raws) return raws;
  return raws.map((raw: any) => ({
    id: raw?.id,
    productId: raw?.productId,
    rawId: raw?.rawId,
    usageInGram: raw?.usageInGram,
    name: raw?.detail?.name,
  }));
};
