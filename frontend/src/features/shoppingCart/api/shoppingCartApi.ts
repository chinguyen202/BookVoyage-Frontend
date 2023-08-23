import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility/constants';

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['ShoppingCarts'],
  endpoints: (builder) => ({
    getCartsByUserId: builder.query({
      query: (userId) => ({
        url: `cart/${userId}`,
      }),
      providesTags: ['ShoppingCarts'],
    }),
    upsertShoppingCart: builder.mutation({
      query: (payload) => ({
        url: `cart`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header
        },
      }),
      invalidatesTags: ['ShoppingCarts'],
    }),
  }),
});

export const { useGetCartsByUserIdQuery, useUpsertShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
