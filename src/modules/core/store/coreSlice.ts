import {createSlice} from '@reduxjs/toolkit';

interface CoreState {
  token: string;
}

const initialState: CoreState = {
  token: '',
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {},
});

export const {} = coreSlice.actions;

export default coreSlice.reducer;
