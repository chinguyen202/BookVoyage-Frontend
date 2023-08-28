export interface Order {
  subtotal: number;
  totalQuantity: number;
  orderStatus: number;
  stripePaymentIntentId: string;
  shippingAddress: ShippingAddress;
  buyerId: string;
  orderItems: OrderItem[];
  createdAt: string;
  modifiedAt: string;
  id: string;
}

export interface OrderCreateForm {
  saveAddress: boolean;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  postCode: string;
  state: string;
  country: string;
}

export interface OrderItem {
  price: number;
  quantity: number;
  bookId: string;
  bookName: string;
  imageUrl: string;
}
