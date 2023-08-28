import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
