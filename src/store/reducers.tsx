import {combineReducers} from '@reduxjs/toolkit';
import coreSlice from '../modules/core/store/coreSlice';

const rootReducers = combineReducers({
  core: coreSlice,
});

export default rootReducers;
