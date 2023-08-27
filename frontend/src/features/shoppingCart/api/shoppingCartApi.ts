import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  }),
  tagTypes: ['ShoppingCarts'],
  endpoints: (builder) => ({
    getCartsByUser: builder.query({
      query: () => ({
        url: `cart`,
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
