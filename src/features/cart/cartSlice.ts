import { createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../interfaces/cart';

interface ICartSlice {
  cartItems: ICart[];
  amount: number;
  total: number;
  isLoading: boolean;
}

const initialState: ICartSlice = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state = initialState;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: ICart) => item.id !== itemId
      );
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item: ICart) => item.id === payload.id
      );
      cartItem!.amount = cartItem!.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item: ICart) => item.id === payload.id
      );
      cartItem!.amount = cartItem!.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item: ICart) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
    getCartRequest: (state) => {
      state.isLoading = true;
    },
    getCartSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = payload;
      state.amount = payload.length;
    },
    getCartFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  getCartRequest,
  getCartSuccess,
  getCartFailed,
} = cartSlice.actions;
export default cartSlice.reducer;
