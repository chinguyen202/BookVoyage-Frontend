import { CartItem } from '../app/models';

export const calculateCartTotal = (cartItems: CartItem[]) => {
  let subtotal = 0;
  let totalItems = 0;

  cartItems.forEach((cartItem) => {
    totalItems += cartItem.quantity ?? 0;
    subtotal += (cartItem.book?.unitPrice ?? 0) * (cartItem.quantity ?? 0);
  });

  return {
    totalItems,
    subtotal,
  };
};
