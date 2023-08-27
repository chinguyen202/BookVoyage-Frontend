import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    //Get user address
    getAddress: builder.query({
      query: () => ({
        url: `users/address`,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),
    //Get current user
    getUser: builder.query({
      query: () => ({
        url: `users`,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),
  }),
});

export const { useGetAddressQuery, useGetUserQuery } = userApi;
export default userApi;
