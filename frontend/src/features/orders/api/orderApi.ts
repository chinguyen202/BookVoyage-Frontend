import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    // Create order
    createOrder: builder.mutation({
      query: (payload) => ({
        url: 'orders',
        method: 'POST',
        body: payload,
        invalidatesTags: ['Orders'],
      }),
    }),
    // Get all orders by log in user
    getAllOrderByUser: builder.query({
      query: () => ({
        url: `orders/users`,
      }),
    }),
    // Get all orders
    getAllOrder: builder.query({
      query: () => ({
        url: `orders`,
      }),
    }),
    // Get an order detail
    getOrderDetail: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        providesTags: ['Orders'],
      }),
    }),
    // Update order status
    updateOrderStatus: builder.mutation({
      query: (payload) => ({
        url: `orders/${payload.orderId}`,
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Orders'],
      }),
    }),
  }),
});

export const {
  useGetAllOrderByUserQuery,
  useGetOrderDetailQuery,
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
export default orderApi;
