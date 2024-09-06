import {createSlice} from '@reduxjs/toolkit';
import {deleteArray} from '../../../utils/helpers';

interface CartState {
  products: any[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {payload} = action;
      let products = [...state.products];

      const selectedIdx = products.findIndex(
        (product: any) => product?.id === payload?.id,
      );
      if (selectedIdx >= 0) {
        products[selectedIdx].qty += 1;
      } else {
        products.push({...payload, qty: 1});
      }

      state.products = products;
    },
    spinnerCart: (state, action) => {
      const {payload} = action;
      const {index, qty} = payload;
      let products = [...state.products];
      if (qty > 0) {
        products[index].qty = qty;
      } else {
        products = deleteArray(products, index);
      }
      state.products = products;
    },
  },
});

export const {addToCart, spinnerCart} = cartSlice.actions;

export default cartSlice.reducer;
