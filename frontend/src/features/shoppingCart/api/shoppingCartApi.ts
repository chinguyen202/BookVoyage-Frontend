import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['ShoppingCarts'],
  endpoints: (builder) => ({
    // Get cart by user
    getCartsByUser: builder.query({
      query: () => ({
        url: `cart`,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      providesTags: ['ShoppingCarts'],
    }),
    // Add or update cart
    upsertShoppingCart: builder.mutation({
      query: (payload) => ({
        url: `cart`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      invalidatesTags: ['ShoppingCarts'],
    }),
  }),
});

export const { useGetCartsByUserQuery, useUpsertShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
