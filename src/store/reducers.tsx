import {combineReducers} from '@reduxjs/toolkit';
import coreSlice from '../modules/core/store/coreSlice';
import cartSlice from '../modules/order/store/cartSlice';

const rootReducers = combineReducers({
  core: coreSlice,
  cart: cartSlice,
});

export default rootReducers;
