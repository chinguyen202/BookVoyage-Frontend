export const baseUrl = 'http://localhost:5000/api/v1';

export const Roles = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

export const OrderStatus = {
  PENDING: 'Pending',
  PROCESSED: 'Processed',
  CONFIRM: 'Confirmed',
  CANCELLED: 'Cancelled',
};

export enum SortTypes {
  PRICE_LOW_HIGH = 'Price Low - High',
  PRICE_HIGH_LOW = 'Price High - Low',
  NAME_A_Z = 'Name A - Z',
  NAME_Z_A = 'Name Z - A',
}
