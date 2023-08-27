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
    // Get all orders
    getAllOrders: builder.query({
      query: () => ({
        url: `orders/users`,
      }),
    }),
    // Get an order detail
    getOrderDetail: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        providesTags: ['Orders'],
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderDetailQuery,
  useCreateOrderMutation,
} = orderApi;
export default orderApi;
