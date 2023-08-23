import { createSlice } from '@reduxjs/toolkit';
import { ShoppingCart } from '../../app/models/shoppingCart';

const initialState: ShoppingCart = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: 'cartItems',
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      // payload - the cart item that needs to be updated together with quantity
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeCartItem: (state, action) => {
      // payload - the cart item that needs to be updated together with quantity
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart, updateQuantity, removeCartItem } =
  shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
