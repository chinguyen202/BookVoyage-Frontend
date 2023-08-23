import { CartItem } from './cartItem';

export interface ShoppingCart {
  buyerId?: string;
  cartItems?: CartItem[];
  cartTotal?: number;
  stripePaymentIntended?: any;
  clientSecret?: any;
  createdAt?: string;
  modifiedAt?: string;
  id?: string;
}
