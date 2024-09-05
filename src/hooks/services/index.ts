import {useState} from 'react';

import InitialState from '../../store/types';
import {ResetStatusHook} from '../../types/hooks';
import {resetStatusHook, setErrorMessage} from '../../utils/helpers';

const initialState: InitialState = {
  loading: 'idle',
  message: '',
  data: null,
};

export const useServices = (repository: (...args: any[]) => Promise<any>) => {
  const [state, setState] = useState<InitialState>(initialState);

  const reset = (key: ResetStatusHook) => {
    let stateNew = resetStatusHook(initialState, state, key);
    setState(stateNew);
  };

  const service = async (...args: any[]) => {
    try {
      setState(prev => ({...prev, loading: 'pending'}));
      const {data: result} = await repository(...args);
      if (result?.meta?.success) {
        setState(prev => ({
          ...prev,
          loading: 'succeeded',
          data: result?.data,
        }));
        return Promise.resolve(result?.data);
      } else {
        const message = result?.meta?.message;
        setState(prev => ({...prev, loading: 'failed', message: message}));
        return Promise.reject(result?.data);
      }
    } catch (error) {
      const message = setErrorMessage(error);
      setState(prev => ({...prev, loading: 'failed', message: message}));
      return Promise.reject(error);
    }
  };

  return {state, service, reset};
};
